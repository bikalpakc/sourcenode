import React from "react";
import Navbar from "@/components/navigation/Navbar";
import WalletGuard from "@/components/WalletGuard/WalletGuard";
const IdeaSubmitLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      <Navbar showConnectWallet create={false} className="sticky top-0 z-50" />
      <WalletGuard>
        <div className="flex-1 flex items-center justify-center w-full p-4">
          <div className="w-full max-w-4xl">{children}</div>
        </div>
      </WalletGuard>
    </div>
  );
};

export default IdeaSubmitLayout;
