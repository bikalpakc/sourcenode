"use client";

import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletProvider";

export default function ConnectWallet() {
  const { walletAddress, isConnecting, connect, disconnect } = useWallet();

  return (
    <Button
      onClick={walletAddress ? disconnect : connect}
      variant="default"
      className="min-w-[160px]"
      disabled={isConnecting}
    >
      {isConnecting
        ? "Connecting..."
        : walletAddress
        ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
        : "Connect Wallet"}
    </Button>
  );
}
