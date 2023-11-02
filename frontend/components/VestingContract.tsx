import { useState, useEffect } from "react";

import { formatUnits } from "viem";
import VestingChart from "./VestingChart";
import { erc20ABI, useContractRead } from "wagmi";
import {
  useVestingWalletBeneficiary,
  useVestingWalletCliff,
  useVestingWalletDuration,
  useVestingWalletStart,
  vestingWalletABI,
} from "@/src/generated";

export default function VestingContract({
  vestingContractAddress,
  tokenAddress,
}: {
  vestingContractAddress: `0x${string}`;
  tokenAddress: `0x${string}`;
}) {
  const [loading, setLoading] = useState(true);
  const { data: balance } = useContractRead({
    address: tokenAddress,
    abi: erc20ABI,
    args: [vestingContractAddress],
  });
  const { data: beneficiary } = useVestingWalletBeneficiary({
    // @ts-ignore
    address: vestingContractAddress,
  });

  const { data: name } = useContractRead({
    abi: erc20ABI,
    address: tokenAddress,
    functionName: "name",
  });
  const { data: decimals } = useContractRead({
    abi: erc20ABI,
    address: tokenAddress,
    functionName: "decimals",
  });
  const { data: start } = useVestingWalletStart({
    // @ts-ignore
    address: vestingContractAddress,
  });
  const { data: cliff } = useVestingWalletDuration({
    // @ts-ignore
    address: vestingContractAddress,
  });
  const { data: duration } = useVestingWalletCliff({
    // @ts-ignore
    address: vestingContractAddress,
  });
  // const { data: start } = useVestingWalletStart();
  // const { data: duration } = useVestingWalletDuration({
  //   // @ts-ignore
  //   address: vestingContractAddress,
  // });

  // const { data: releasedAmount } = useVestingWalletReleased({
  //   // @ts-ignore
  //   address: vestingContractAddress,
  //   args: [tokenAddress],
  // });
  // const { data: claimable } = useVestingWalletRelease({
  //   // @ts-ignore
  //   address: vestingContractAddress,
  //   args: [tokenAddress],
  // });
  // const { data: claim } = usePrepareVestingWalletRelease({
  //   // @ts-ignore
  //   address: vestingContractAddress,
  //   args: [tokenAddress],
  // });
  // console.log({ cliff });
  // console.log({ beneficiary });
  // console.log({ start });
  console.log({ start });
  console.log({ beneficiary });
  console.log({ duration });
  console.log({ decimals });
  console.log({ balance });
  console.log({ name });
  console.log({ cliff });

  // return <></>;
  // console.log({ duration });
  // console.log({ releasedAmount });

  // useEffect(() => {
  //   if (
  //     beneficiary &&
  //     cliff &&
  //     releasedAmount &&
  //     decimals &&
  //     balance &&
  //     start &&
  //     duration
  //   ) {
  //     setLoading(false);
  //   }
  // }, [beneficiary, cliff, releasedAmount, decimals, balance, start, duration]);

  // if (loading) {
  //   return <>Loading...</>;
  // }

  // const total = balance! + releasedAmount!;
  // console.log("claimed%", (Number(releasedAmount!) / Number(total!)) * 100);
  // // console.log("claimable%", (Number(claimable!) / Number(total!)) * 100);

  // return (
  //   <div
  //     style={{
  //       border: "1px solid #ccc",
  //       borderRadius: "15px",
  //       padding: "20px",
  //       margin: "10px",
  //       boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  //       transition: "0.3s",
  //     }}
  //   >
  //     <h2 style={{ margin: "0 0 10px 0" }}>Vesting Contract Details: {name}</h2>
  //     <p>
  //       <strong>Beneficiary:</strong> {beneficiary}
  //     </p>
  //     <p>
  //       <strong>Vesting Contract:</strong> {vestingContractAddress}
  //     </p>
  //     {/* <p>
  //       <strong>Cliff:</strong> {toTime(cliff!)}
  //     </p> */}
  //     {/* <p>
  //       <strong>Vested amount:</strong> {formatUnits(vestedAmount!, decimals!)}
  //     </p> */}
  //     <p>
  //       <strong>Unclaimed total:</strong> {formatUnits(balance!, decimals!)}
  //     </p>
  //     <p>
  //       <strong>Total position:</strong> {formatUnits(total, decimals!)}
  //     </p>

  //     <p>
  //       <strong>Claimed amount:</strong>{" "}
  //       {formatUnits(releasedAmount!, decimals!)}
  //     </p>
  //     <p>
  //       {/* <strong>Claimable:</strong> {formatUnits(claimable, decimals!)} */}
  //     </p>
  //     <div
  //       style={{
  //         height: "20px",
  //         width: "100%",
  //         backgroundColor: "#bbb",
  //         display: "flex",
  //       }}
  //     >
  //       <div
  //         style={{
  //           height: "100%",
  //           width: `${(Number(releasedAmount!) / Number(total!)) * 100}%`,
  //           backgroundColor: "#4CAF50",
  //           position: "relative",
  //         }}
  //         title="claimed"
  //       ></div>
  //       <div
  //         style={{
  //           height: "100%",
  //           width: `${(Number(claimable) / Number(total)) * 100}%`,
  //           backgroundColor: "yellow",
  //           position: "relative",
  //         }}
  //         title="Claimable"
  //       ></div>
  //       <div
  //         style={{
  //           height: "100%",
  //           width: `${(Number(balance!) / Number(total!)) * 100}%`,
  //           backgroundColor: "red",
  //           position: "relative",
  //         }}
  //         title="vesting"
  //       ></div>
  //     </div>
  //     <button
  //       style={{
  //         margin: "10px 0",
  //         padding: "10px 20px",
  //         borderRadius: "5px",
  //         border: "none",
  //         backgroundColor: "#4CAF50",
  //         color: "white",
  //         textTransform: "uppercase",
  //         cursor: "pointer",
  //       }}
  //     >
  //       Claim
  //     </button>
  return (
    <VestingChart
      start={1630454400}
      cliff={1630454400 + 31536000}
      end={1630454400 + 126144000}
      symbol={"Forta"}
      total={16000000}
      decimals={18}
    />
  );
  //   </div>
  // );
}

function toTime(seconds: BigInt) {
  const milliseconds = Number(seconds) * 1000;
  const totalSeconds = Math.floor(milliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const years = Math.floor(totalDays / 365);
  const daysAfterYears = totalDays % 365;

  const months = Math.floor(daysAfterYears / 30);
  const daysAfterMonths = daysAfterYears % 30;

  const weeks = Math.floor(daysAfterMonths / 7);
  const days = daysAfterMonths % 7;

  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;

  return `${years} Years : ${months} Months : ${weeks} Weeks : ${days} Days : ${hours} Hours : ${minutes} Min`;
}
