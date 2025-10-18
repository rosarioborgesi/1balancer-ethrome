"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserInfo } from "@/hooks/use-user-info";
import { HomePage } from "@/components/home/HomePage";
import { useWalletSSRData } from "@/hooks/useWalletSSR";

interface HomePageClientProps {
  initialData: any;
}

export function HomePageClient({ initialData }: HomePageClientProps) {
  const router = useRouter();
  const { isUserAuthenticated } = useUserInfo();
  const walletData = useWalletSSRData();
  const [homeData] = useState(initialData.data);
  // const [loading, setLoading] = useState(false);

  // Refresh data when user connects wallet
  // useEffect(() => {
  //   if (walletData.address && walletData.isConnected) {
  //     const refreshDataWithUser = async () => {
  //       setLoading(true);
  //       try {
  //         const updatedData = await getHomeSSRData(walletData.address);
  //         setHomeData(updatedData.data);
  //       } catch (error) {
  //         console.error("Failed to refresh home data:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     refreshDataWithUser();
  //   }
  // }, [walletData.address, walletData.isConnected]);

  const handleGetStarted = () => {
    if (isUserAuthenticated && walletData.isConnected) {
      router.push("/wallet");
    } else {
      // If not authenticated, trigger wallet connection
      walletData.connectWallet();
    }
  };

  const handleStartRebalancing = () => {
    if (isUserAuthenticated && walletData.isConnected) {
      router.push("/rebalance");
    } else {
      // If not authenticated, trigger wallet connection
      walletData.connectWallet();
    }
  };

  // Enhanced data with user context
  const enhancedData = {
    ...homeData,
    userPortfolio: walletData.portfolioTokens,
    totalPortfolioValue: walletData.totalValue,
    isUserConnected: walletData.isConnected,
    userAddress: walletData.address,
  };

  return (
    <HomePage
      activeTab="home"
      onGetStarted={handleGetStarted}
      onStartRebalancing={handleStartRebalancing}
      data={enhancedData}
    />
  );
}
