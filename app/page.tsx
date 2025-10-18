"use client";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import sdk from "@farcaster/miniapp-sdk";
import { OneBalancerController } from "@/components/one-balancer-controller";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HomePage } from "@/components/home/HomePage";
import { getHomeData } from "@/utils/storage";
import { useUserInfo } from '../hooks/use-user-info';

export default function Home() {
  const router = useRouter();
  const [homeData, setHomeData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { setMiniAppReady, isMiniAppReady } = useMiniKit();
  const { user, isUserAuthenticated } = useUserInfo();
  const [isInMiniApp, setIsInMiniApp] = useState<boolean | undefined>();

  useEffect(() => {
    if (!isMiniAppReady) {
      setMiniAppReady();
    } else {
      sdk.isInMiniApp().then((res) => setIsInMiniApp(res));
    }
  }, [setMiniAppReady, isMiniAppReady]);
  if (isInMiniApp === undefined) return null;

  const fetchData = async () => {
    const data = await getHomeData();
    setHomeData(data);
    setLoading(false);
  };
  fetchData();

  const handleGetStarted = () => {
    if (user && isUserAuthenticated) {
      router.push("/wallet");
    } else {
      // If not authenticated, the HomePage component will handle wallet connection
      // and then we can redirect after successful connection
    }
  };

  const handleStartRebalancing = () => {
    if (user && isUserAuthenticated) {
      router.push("/wallet");
    } else {
      // If not authenticated, the HomePage component will handle wallet connection
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-background animate-pulse" />;
  }
  
  return (
    <HomePage
      activeTab="home"
      onGetStarted={handleGetStarted}
      onStartRebalancing={handleStartRebalancing}
      data={homeData}
    />
  );
}
