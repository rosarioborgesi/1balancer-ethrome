import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ThemeProvider } from "./provider/ThemeProvider";
import LiveCryptoTickerServer from "./footer/LiveCryptoTickerServer";
import { HeaderSimplified } from "./header";

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export const MainLayout = ({ children, className }: MainLayoutProps) => {
  return (
    <ThemeProvider enableSystem>
      <HeaderSimplified />
      <div className={cn("w-screen min-h-screen pt-16 sm:pt-20", className)}>
        <main>{children}</main>
      </div>
      <LiveCryptoTickerServer />
    </ThemeProvider>
  );
};
