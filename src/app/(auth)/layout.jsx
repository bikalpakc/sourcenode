import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="flex items-center justify-center bg-[#0f1110] h-screen">
      {children}
    </div>
  );
}
