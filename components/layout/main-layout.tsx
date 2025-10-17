import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export const MainLayout = ({ children, className }: MainLayoutProps) => {
  return (
    <div className={cn("w-screen min-h-screen", className)}>
      {/*HEADER WITH CHECK IF IS MINIAPP*/}
      <main>{children}</main>
      {/*FOOTER*/}
    </div>
  );
};
