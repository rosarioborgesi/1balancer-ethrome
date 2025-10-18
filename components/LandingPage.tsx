import { useIsInMiniApp } from "@coinbase/onchainkit/minikit";
import { Wallet, Shield, TrendingUp, Zap, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useAccount, useConnect } from "wagmi";
import Image from "next/image";
import OneBalancerLogo from "../assets/1balancer.png";

const LandingPage = () => {
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();
  const { isInMiniApp } = useIsInMiniApp();

  useEffect(() => {
    if (isInMiniApp && !isConnected) {
      connect({ connector: connectors[0] });
    }
  }, [connect, connectors, isConnected, isInMiniApp]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        </div>

        <nav className="relative z-10 px-6 py-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-32 h-12 rounded-lg flex items-center justify-center">
                <Image src={OneBalancerLogo} alt="One balancer logo" />
              </div>
              <span className="text-2xl font-bold text-white">1balancer</span>
            </div>
          </div>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              Automated Portfolio
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Rebalancing
              </span>
            </h1>
            <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto">
              Keep your USDC/WETH portfolio perfectly balanced. Set your
              strategy and let our automated system maintain your ideal
              allocation through 1inch DEX.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <Shield className="text-blue-400 mb-4 mx-auto" size={40} />
                <h3 className="text-white font-semibold mb-2">Secure</h3>
                <p className="text-blue-200 text-sm">
                  Non-custodial solution with Web3 wallet integration
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <Zap className="text-blue-400 mb-4 mx-auto" size={40} />
                <h3 className="text-white font-semibold mb-2">Fast</h3>
                <p className="text-blue-200 text-sm">
                  Powered by 1inch DEX Aggregator for best rates
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <TrendingUp className="text-blue-400 mb-4 mx-auto" size={40} />
                <h3 className="text-white font-semibold mb-2">Automated</h3>
                <p className="text-blue-200 text-sm">
                  Set it and forget it with smart rebalancing
                </p>
              </div>
            </div>
            {!isInMiniApp && (
              <button
                onClick={() => connect({ connector: connectors[0] })}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl font-semibold text-white shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105 flex items-center justify-center mx-auto"
              >
                <Wallet className="mr-2" size={20} />
                Connect Base Wallet
                <ChevronRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
