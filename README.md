# VC Vest

<p align="center">
  <img src="./assets/vc-vest1.png" width="500">
</p>

Query the chain for all contracts that may be vesting contracts holding some unclaimed tokens.

## Methodology

You can view exactly whats going on here in the `get_vesting_contracts.py` script but there are basically 3 main steps:

1. Check for the relevant address against every single storage slot.
     - rationale here is that vesting contacts often have a "owner", "recipient" or "beneficiary" field that would be equal to the EOA that gets to claim these tokens.
     - this is not perfect, some contracts might hold the EOA address in a mapping, this would be missed.
2. For all of these "candidate" contracts, get their token balances and metadata because if this was a vesting contract, it would be holding the relevant token.
    - this allows us to display which tokens are in this contract, helping us determine which vesting contract this is.
3. For all the contracts, check the ABI for any keywords that often appear in vesting contracts.
    - This helps filter on the frontend for noise

## How to use

Get the slots data set:

``` bash
mkdir data
cd data
curl -s https://raw.githubusercontent.com/paradigmxyz/paradigm-data-portal/main/datasets/ethereum_slots/README.md | grep -oE "https://datasets.*parquet" | aria2c -i -    
```

Build a list of addresses (this is your EOAs):

``` bash
echo "0x...123" > data/eth_addresses.txt
```

Run the script to identify contracts:

``` bash
export ETHERSCAN_API_KEY=<insert your etherscan api key>
export ALCHEMY_API_KEY=<insert your alchemy api key>
pip install polars
python get_vesting_contracts.py "data/ethereum_slots*.parquet" data/eth_addresses.txt
```

Copy over the output to the frontend:

``` bash
cp out/vesting.json fe/public/
```

spin up the frontend:

``` bash
cd fe
bun run start
```

Voila!
