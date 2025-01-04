import Navbar from "@/components/navigation/Navbar";
import WalletGuard from "@/components/WalletGuard/WalletGuard";
const RootLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br bg-black text-white overflow-hidden">
      <Navbar showConnectWallet />
      <WalletGuard>{children}</WalletGuard>
    </div>
  );
};

export default RootLayout;
