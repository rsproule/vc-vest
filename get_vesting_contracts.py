import polars as pl
import sys
import requests
import os
API_KEY = os.getenv('ALCHEMY_API_KEY')
assert API_KEY is not None, "API_KEY is not set in environment variables"
alchemy_url = f"https://eth-mainnet.g.alchemy.com/v2/{API_KEY}"


def get_addresses(file_path):
    try:
        with open(file_path, 'r') as file:
            addresses = [line.strip() for line in file]
    except FileNotFoundError:
        addresses = file_path.split()
    return list(set([address[2:].lower() if address.startswith('0x') else address.lower() for address in addresses]))

def get_touched_contracts_df(slots_df, addresses):
    df = slots_df.lazy().filter(pl.col("value").bin.encode("hex").is_in(addresses)).collect()
    return df.with_columns(
        pl.col("contract_address").bin.encode("hex"),
        pl.col("value").bin.encode("hex"),
        pl.col("slot").bin.encode("hex")
    )

def get_token_balances(address):
    payload = {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "alchemy_getTokenBalances",
        "params": [address, "erc20"]
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json"
    }
    response = requests.post(alchemy_url, json=payload, headers=headers)
    response_json = response.json()
    token_balances = response_json.get('result', {}).get('tokenBalances', [])
    parsed_token_balances = [{'contractAddress': balance['contractAddress'], 'tokenBalance': balance['tokenBalance']} for balance in token_balances]
    for balance in parsed_token_balances:
        metadata = get_token_metadata(balance['contractAddress'])
        balance.update(metadata)
    
    return parsed_token_balances

def get_token_metadata(address): 
    payload = {
    "id": 1,
    "jsonrpc": "2.0",
    "method": "alchemy_getTokenMetadata",
    "params": [address]
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json"
    }

    response = requests.post(alchemy_url, json=payload, headers=headers)
    response_json = response.json()
    return response_json["result"]


slots_df = pl.scan_parquet(sys.argv[1])
addresses = get_addresses(sys.argv[2])
touched_contracts_df = get_touched_contracts_df(slots_df, addresses)
contract_addresses = ['0x' + address for address in touched_contracts_df['contract_address'].to_list()]


for address in contract_addresses:
    token_balances = get_token_balances(address)
    print(token_balances)

touched_contracts_df.write_csv('out/contracts.csv')