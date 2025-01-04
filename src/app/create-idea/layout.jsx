import React from "react";
import Navbar from "@/components/navigation/Navbar";
import WalletGuard from "@/components/WalletGuard/WalletGuard";
const IdeaSubmitLayout = ({ children }) => {
  return (
    <div className=" bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      <Navbar showConnectWallet create={false} className="sticky top-0 z-50" />
      <WalletGuard>{children}</WalletGuard>
    </div>
  );
};

export default IdeaSubmitLayout;
