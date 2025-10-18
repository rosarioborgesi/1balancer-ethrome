"use client";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useEffect, useState } from "react";
import sdk from "@farcaster/miniapp-sdk";
import { OneBalancerController } from "@/components/one-balancer-controller";

const MainPage = () => {
  const { setMiniAppReady, isMiniAppReady } = useMiniKit();
  const [isInMiniApp, setIsInMiniApp] = useState<boolean | undefined>();
  useEffect(() => {
    if (!isMiniAppReady) {
      setMiniAppReady();
    } else {
      sdk.isInMiniApp().then((res) => setIsInMiniApp(res));
    }
  }, [setMiniAppReady, isMiniAppReady]);
  if (isInMiniApp === undefined) return null;

  return isInMiniApp ? <div>Mini App</div> : <OneBalancerController />;
};

export default MainPage;
