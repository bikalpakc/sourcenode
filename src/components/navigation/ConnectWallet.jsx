"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

export default function ConnectWallet() {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    const isLoggedOut = localStorage.getItem("walletLoggedOut") === "true";

    const checkWalletConnection = async () => {
      if (window.ethereum && !isLoggedOut) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });

          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            toast.success(
              `Auto-connected to ${accounts[0].slice(
                0,
                4
              )}...${accounts[0].slice(-4)}`
            );
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
          toast.error("Error checking wallet connection");
        }
      }
    };

    const handleAccountsChanged = (accounts) => {
      const isLoggedOut = localStorage.getItem("walletLoggedOut") === "true";

      if (accounts.length > 0 && !isLoggedOut) {
        setWalletAddress(accounts[0]);
        toast.success(
          `Connected to ${accounts[0].slice(0, 4)}...${accounts[0].slice(-4)}`
        );
      } else {
        setWalletAddress(null);
        toast.error("Wallet disconnected");
      }
    };

    checkWalletConnection();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  const handleConnectWallet = async () => {
    try {
      if (!window.ethereum) {
        toast.error("Please install MetaMask to connect your wallet");
        return;
      }

      localStorage.removeItem("walletLoggedOut");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        toast.success(
          `Connected to ${accounts[0].slice(0, 4)}...${accounts[0].slice(-4)}`
        );
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.setItem("walletLoggedOut", "true");
    setWalletAddress(null);
    toast.success("Wallet disconnected. Click again to reconnect.");
  };

  return (
    <>
      <Button
        onClick={walletAddress ? handleLogout : handleConnectWallet}
        variant="default"
        className="min-w-[160px]"
      >
        {walletAddress
          ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
          : "Connect Wallet"}
      </Button>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </>
  );
}
