import { CivicAuthProvider } from "@civic/auth-web3/react";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  WagmiProvider,
  createConfig,
  http,
} from "wagmi";
import { embeddedWallet } from "@civic/auth-web3/wagmi";
import { base } from "wagmi/chains";

const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [embeddedWallet()],
});

// Wagmi requires react-query
const queryClient = new QueryClient();


