"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HomePage } from "@/components/home/HomePage";
import { getRebalanceData } from "@/utils/storage";
import { useUserInfo } from "@/hooks/use-user-info";

export default function RebalancePage() {
  const router = useRouter();
  const { isUserAuthenticated, user } = useUserInfo();
  type RebalanceDataType = {
    portfolioStats: {
      totalRebalances: number;
      avgGains: string;
      riskReduction: string;
    };
    cashIsKing: {
      title: string;
      subtitle: string;
      description: string;
      minApy: number;
      maxApy: number;
      benefits: any[];
    };
    features: any[];
    howItWorks: any[];
  };
  const [rebalanceData, setRebalanceData] = useState<RebalanceDataType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRebalanceData();
      setRebalanceData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleStartRebalancing = () => {
    if (isUserAuthenticated && user) {
      router.push("/wallet");
    } else {
      // If not authenticated, the HomePage component will handle wallet connection
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-background animate-pulse" />;
  }

  return <HomePage activeTab="rebalance" onStartRebalancing={handleStartRebalancing} data={rebalanceData} />;
}
