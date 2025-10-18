"use client";

import { useRouter } from "next/navigation";
import { CreateSimplePortfolio } from "@/components/wallet/CreateSimplePortfolio";

export default function WalletCreatePortfolio() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <CreateSimplePortfolio
        onBack={() => {
          router.push("/wallet");
        }}
      />
    </div>
  );
}
