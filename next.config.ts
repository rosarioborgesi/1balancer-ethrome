import type { NextConfig } from "next";
import { createCivicAuthPlugin } from "@civic/auth/nextjs";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

const withCivicAuth = createCivicAuthPlugin({
  clientId: process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID as string,
});

export default withCivicAuth(nextConfig);
