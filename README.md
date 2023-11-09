# VC Vest

<p align="center">
  <img src="./assets/vc-vest1.png" width="500">
</p>

Query the chain for all contracts that may have some tokens that are claimable by a list of addresses.

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
