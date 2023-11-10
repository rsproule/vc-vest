import json
import time
import polars as pl
import sys
import requests
import os
ALCHEMY_API_KEY = os.getenv('ALCHEMY_API_KEY')
assert ALCHEMY_API_KEY  is not None, "API_KEY is not set in environment variables"
alchemy_url = f"https://eth-mainnet.g.alchemy.com/v2/{ALCHEMY_API_KEY}"
ETHERSCAN_API_KEY = os.getenv('ETHERSCAN_API_KEY')
assert ETHERSCAN_API_KEY is not None, "ETHERSCAN_API_KEY is not set in environment variables"

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
        if metadata is None:
            continue
        if metadata['symbol'] == 'WETH':
            parsed_token_balances.remove(balance)
            continue
        balance.update(metadata)
        try:
            balance['units'] = int(balance['tokenBalance'], 16) / (10 ** balance['decimals'])
        except Exception:
            print(f"Error parsing token balance for {balance['contractAddress']}")
            balance['units'] = 0
    
    # do some check for if this is an obvious spam token
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

    try:
        response = requests.post(alchemy_url, json=payload, headers=headers)
        response.raise_for_status()
    except requests.exceptions.HTTPError as errh:
        print ("Http Error:",errh)
        return None
    except requests.exceptions.ConnectionError as errc:
        print ("Error Connecting:",errc)
        return None
    except requests.exceptions.Timeout as errt:
        print ("Timeout Error:",errt)
        return None
    except requests.exceptions.RequestException as err:
        print ("Something went wrong",err)
        return None

    response_json = response.json()
    return response_json["result"]

def get_contract_abi(address): 
    etherscan_req_url = f"https://api.etherscan.io/api?module=contract&action=getabi&address={address}&apikey={ETHERSCAN_API_KEY}"
    for i in range(5):  # Retry up to 5 times
        try:
            response = requests.get(etherscan_req_url)
            response.raise_for_status()  # Raises stored HTTPError, if one occurred
            return response.json()["result"]
        except requests.exceptions.HTTPError:
            print(f"HTTPError occurred for {address}. Retrying...")
            time.sleep(2 ** i)  # Exponential backoff
    print(f"Failed to get contract ABI for {address} after 5 attempts")
    return None

def is_vesting_like(abi):
    return any(keyword in abi for keyword in ["release", "cliff", "duration", "vesting", "vest", "lockup", "lock", "unlock", "unlocking", "claim"])

slots_df = pl.scan_parquet(sys.argv[1])
addresses = get_addresses(sys.argv[2])
touched_contracts_df = get_touched_contracts_df(slots_df, addresses)
contract_addresses = ['0x' + address for address in touched_contracts_df['contract_address'].to_list()]

d = {}
for address in contract_addresses:
    token_balances = get_token_balances(address)
    abi = get_contract_abi(address)
    is_vestingish = is_vesting_like(abi)
    contract_data = {
        'address': address,
        'token_balances': token_balances,
        'is_vestingish': is_vestingish
    }
    d[address] = contract_data

with open('out/vesting.json', 'w') as f:
    json.dump(d, f)
