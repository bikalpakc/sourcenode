import Navbar from "@/components/navigation/Navbar";
import WalletGuard from "@/components/WalletGuard/WalletGuard";
const HomeLayout = ({ children }) => {
  return (
    <div className="relative bg-gradient-to-br bg-black text-white overflow-hidden">
      <Navbar showConnectWallet />
      <WalletGuard>{children}</WalletGuard>
    </div>
  );
};

export default HomeLayout;
