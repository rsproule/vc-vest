import React, { useState, useRef } from "react";

interface TokenBalance {
  contractAddress: string;
  tokenBalance: string;
  decimals: number;
  logo: string;
  name: string;
  symbol: string;
  units: number;
}

interface Data {
  address: string;
  token_balances: TokenBalance[];
  is_vestingish: boolean;
}

export default function ContractEntry() {
  const [data, setData] = useState<Record<string, Data>>({});
  const [filterVestingish, setFilterVestingish] = useState(true);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data: Record<string, Data> = JSON.parse(e.target!.result as string);
      setData(data);
    };
    reader.readAsText(file);
  };

  const filteredData = filterVestingish
    ? Object.entries(data).filter(([key, value]) => value.is_vestingish)
    : Object.entries(data);

  return (
    <div >
      <label>
        <input
          type="checkbox"
          checked={filterVestingish}
          onChange={() => setFilterVestingish(!filterVestingish)}
        />
        Filter by Vestingish
      </label>
      <input
        type="file"
        ref={fileInput}
        onChange={handleFileUpload}
      />
      {filteredData.map(([key, value]) => (
        <div key={key}>
          <h2>
            Possible Vesting contract address:{" "}
            <a href={`https://etherscan.io/address/${value.address}`}>
              {value.address}
            </a>
          </h2>
          <p>Vestingish: {value.is_vestingish.toString()}</p>
          <table
            style={{ border: "1px solid black", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Token Contract Address
                </th>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Token Balance
                </th>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Decimals
                </th>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Logo
                </th>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Name
                </th>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Symbol
                </th>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Units
                </th>
              </tr>
            </thead>
            <tbody>
              {value.token_balances.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid black", padding: "10px" }}>
                    <a
                      href={`https://etherscan.io/address/${item.contractAddress}`}
                    >
                      {item.contractAddress}
                    </a>
                  </td>
                  <td style={{ border: "1px solid black", padding: "10px" }}>
                    {item.tokenBalance}
                  </td>
                  <td style={{ border: "1px solid black", padding: "10px" }}>
                    {item.decimals}
                  </td>
                  <td style={{ border: "1px solid black", padding: "10px" }}>
                    <img
                      src={item.logo}
                      alt={item.name}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td style={{ border: "1px solid black", padding: "10px" }}>
                    {item.name}
                  </td>
                  <td style={{ border: "1px solid black", padding: "10px" }}>
                    {item.symbol}
                  </td>
                  <td style={{ border: "1px solid black", padding: "10px" }}>
                    {item.units}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
        </div>
      ))}
    </div>
  );
}
