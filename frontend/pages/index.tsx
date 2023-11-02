"use client";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
const DynamicWallet = dynamic(() => import("../components/Wallet"), {
  ssr: false,
});
const DynamicVestingContract = dynamic(
  () => import("../components/VestingContract"),
  {
    ssr: false,
  }
);
const Home: NextPage = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <DynamicWallet />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {/* <VestingContract
          // paraswap
          tokenAddress="0xcAfE001067cDEF266AfB7Eb5A286dCFD277f3dE5"
          vestingContractAddress="0x91D3C6E952524ee921A1A92508ed6289c0C319ee"
        /> */}
        <DynamicVestingContract
          // forta
          tokenAddress="0x41545f8b9472D758bB669ed8EaEEEcD7a9C4Ec29"
          vestingContractAddress="0xe6454a6da7da0f87757329a8ee1675f8140b931b"
        />

        {/* <VestingContract
          tokenAddress="0x41545f8b9472D758bB669ed8EaEEEcD7a9C4Ec29"
          vestingContractAddress="0x7103876d7bE82dEaa2cC85Ba7b76ddaC0836BFC1"
        /> */}
      </div>
    </>
  );
};

export default Home;
