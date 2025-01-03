import React from "react";
import Navbar from "@/components/navigation/Navbar";
export default function DetailedIdea({ children }) {
  return (
    <>
      <Navbar />
      <div className="">{children}</div>
    </>
  );
}
