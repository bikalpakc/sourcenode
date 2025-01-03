import React from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/navigation/Navbar";
const RootLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br bg-black text-white overflow-hidden">
      <Navbar />
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </div>
  );
};

export default RootLayout;
