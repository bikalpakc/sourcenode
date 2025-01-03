
import Navbar from "@/components/navigation/Navbar";
const RootLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br bg-black text-white overflow-hidden">
      <Navbar />
    {children}
    </div>
  );
};

export default RootLayout;
