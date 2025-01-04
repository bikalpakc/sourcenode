import React from "react";
import Navbar from "@/components/navigation/Navbar";
export default function UserProfileLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br bg-black text-white overflow-hidden">
      <Navbar />
      <div className="">{children}</div>
    </div>
  );
}
