"use client";
import { ReactNode } from "react";
import { base } from "wagmi/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import "@coinbase/onchainkit/styles.css";
import { CivicAuthProvider } from "@civic/auth/nextjs";
import { AuthKitProvider } from "@farcaster/auth-kit";

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          mode: "auto",
        },
        wallet: {
          display: "modal",
          preference: "all",
        },
      }}
      miniKit={{
        enabled: true,
        autoConnect: true,
        notificationProxyUrl: undefined,
      }}
    >
      {children}
    </OnchainKitProvider>
  );
}

export const Providers = ({ children }: { children: ReactNode }) => {
  const config = {
    rpcUrl: "https://mainnet.optimism.io",
    domain: "example.com",
    siweUri: "https://example.com/login",
  };

  return (
    <RootProvider>
      <CivicAuthProvider>
        <AuthKitProvider config={config}>{children}</AuthKitProvider>
      </CivicAuthProvider>
    </RootProvider>
  );
};
