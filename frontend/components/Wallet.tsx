import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

function Wallet() {
  const { address } = useAccount();
  return <>{address ?? <ConnectKitButton />} </>;
}

export default Wallet;
