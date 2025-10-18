import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import { SafeArea } from "@coinbase/onchainkit/minikit";
import { minikitConfig } from "../minikit.config";
import { Providers } from "./rootProvider";
import { CivicAuthProvider } from "@civic/auth-web3/nextjs";
import "./globals.css";
import { MainLayout } from '../components/layout/main-layout';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: minikitConfig.miniapp.name,
    description: minikitConfig.miniapp.description,
    other: {
      "fc:frame": JSON.stringify({
        version: minikitConfig.miniapp.version,
        imageUrl: minikitConfig.miniapp.heroImageUrl,
        button: {
          title: `Join the ${minikitConfig.miniapp.name} Waitlist`,
          action: {
            name: `Launch ${minikitConfig.miniapp.name}`,
            type: "launch_frame",
          },
        },
      }),
    },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CivicAuthProvider>
      <Providers>
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${inter.variable} ${sourceCodePro.variable}`}
            cz-shortcut-listen="true"
          >
            <MainLayout >
              <SafeArea>{children}</SafeArea>
            </MainLayout>
          </body>
        </html>
      </Providers>
    </CivicAuthProvider>
  );
}
