import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Poppins } from "next/font/google";
import { WalletProvider } from "@/contexts/WalletProvider";
import { Toaster } from "react-hot-toast";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Sourcenode",
  description: "Decentralized Idea Sharing Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased max-w-full overflow-x-hidden",
          poppins.className
        )}
      >
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <WalletProvider>
            {children}
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
          </WalletProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
