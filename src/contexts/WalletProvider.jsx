"use client";

import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const WalletContext = createContext(undefined);

export function WalletProvider({ children }) {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const checkConnection = async () => {
    const isLoggedOut = localStorage.getItem("walletLoggedOut") === "true";

    if (window.ethereum && !isLoggedOut) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          return true;
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
        toast.error("Error checking wallet connection");
      }
    }
    return false;
  };

  const connect = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask to connect your wallet");
      return;
    }

    setIsConnecting(true);
    try {
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
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    localStorage.setItem("walletLoggedOut", "true");
    setWalletAddress(null);
    toast.success("Wallet disconnected. Connect again to continue.");
  };

  useEffect(() => {
    checkConnection();

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

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", () => {
          window.location.reload();
        });
      }
    };
  }, []);

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        isConnected: !!walletAddress,
        isConnecting,
        connect,
        disconnect,
        checkConnection,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
