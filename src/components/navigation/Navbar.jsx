import React from "react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ConnectWallet from "./ConnectWallet";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Navbar = async ({ showConnectWallet = false }) => {
  const user = await currentUser();

  return (
    <header className="relative container mx-auto px-4 py-8 z-10">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/A-logo.png"
            alt="Logo"
            width={33}
            height={33}
            priority
          />
          <span className="text-xl font-medium">SourceNode</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link
                href="#features"
                className="hover:text-blue-400 transition-colors text-sm md:text-base"
              >
                Features
              </Link>
              <Link
                href="/sign-in"
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className={buttonVariants({
                  size: "sm",
                  className:
                    "hidden md:flex bg-[#034ae2] text-white hover:bg-[#0452fb]",
                })}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <UserButton />
              {showConnectWallet && <ConnectWallet />}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
