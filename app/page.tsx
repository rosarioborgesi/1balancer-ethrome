"use client";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useEffect } from "react";
import Main from "@/components/Main";

const MainPage = () => {
  const { setMiniAppReady, isMiniAppReady } = useMiniKit();

  useEffect(() => {
    if (!isMiniAppReady) {
      setMiniAppReady();
    }
  }, [setMiniAppReady, isMiniAppReady]);

  return <Main />;
};

export default MainPage;
