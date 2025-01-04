"use client";

import { useWallet } from "@/contexts/WalletProvider.jsx";
import { Button } from "@/components/ui/button";

export default function WalletGuard({ children }) {
  const { isConnected, connect, isConnecting } = useWallet();

  if (!isConnected) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center">
        <div className="text-center space-y-4 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold text-foreground text-gray-100">
            Wallet Connection Required
          </h2>
          <p className="text-muted-foreground mb-4">
            Please connect your wallet to proceed
          </p>
          <Button
            onClick={connect}
            disabled={isConnecting}
            size="lg"
            className="min-w-[200px]"
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
