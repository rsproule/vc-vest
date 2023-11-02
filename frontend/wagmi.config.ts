import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20ABI, mainnet } from "wagmi";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "erc20",
      abi: erc20ABI,
    },
  ],
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: 1,
      contracts: [
        {
          name: "VestingWallet",
          address: {
            [mainnet.id]: "0xF5E4f8e6F4eD07c2854a315332B883Dac49b2575",
          },
        },
        {
          name: "Vesting",
          address: {
            [mainnet.id]: "0xca002A2Fdd1ad60FB1bBd2aEF4b32FA62da6d87D",
          },
        },
      ],
    }),
    react(),
  ],
});
