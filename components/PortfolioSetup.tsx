import React from "react";
import { Clock, ChevronRight } from "lucide-react";
import { useAccount } from "wagmi";
import { formatAddress } from "@/lib/utils";
import { BASE_EXPLORER_URL } from "@/config/constants";
import { useIsInMiniApp, useOpenUrl } from "@coinbase/onchainkit/minikit";
import { useRouter } from "next/navigation";

interface PortfolioSetupProps {
  usdcAmount: string;
  setUsdcAmount: (value: string) => void;
  wethAmount: string;
  setWethAmount: (value: string) => void;
  rebalanceInterval: string;
  setRebalanceInterval: (value: string) => void;
  onCreateStrategy: () => void;
}

const PortfolioSetup: React.FC<PortfolioSetupProps> = ({
  usdcAmount,
  setUsdcAmount,
  wethAmount,
  setWethAmount,
  rebalanceInterval,
  setRebalanceInterval,
  onCreateStrategy,
}) => {
  const { address } = useAccount();
  const openUrl = useOpenUrl();
  const { isInMiniApp } = useIsInMiniApp();
  const router = useRouter();
  const handlerOnClick = () => {
    const linkUrl = `${BASE_EXPLORER_URL}/address/${address}`;
    if (isInMiniApp) {
      openUrl(linkUrl);
    } else {
      router.push(linkUrl);
    }
  };
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Create Portfolio</h2>
        <h2 className="text-xl font-bold text-white mb-6">
          My Wallet:{" "}
          <button
            onClick={handlerOnClick}
            className="underline underline-offset-4 cursor-pointer"
          >
            {formatAddress(address)}
          </button>
        </h2>
        <div className="mb-6">
          <label className="text-blue-300 text-sm font-semibold mb-2 block">
            USDC Amount
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 font-semibold">
              $
            </div>
            <input
              type="number"
              value={usdcAmount}
              onChange={(e) => setUsdcAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white text-lg focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-blue-300 text-sm font-semibold mb-2 block">
            WETH Amount
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 font-semibold">
              Ξ
            </div>
            <input
              type="number"
              value={wethAmount}
              onChange={(e) => setWethAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white text-lg focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-blue-300 text-sm font-semibold mb-2 block">
            Rebalancing Strategy
          </label>
          <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-4">
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">Fixed 50/50</span>
              <div className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-lg text-sm">
                50% USDC / 50% WETH
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-blue-300 text-sm font-semibold mb-2 block">
            Time Interval
          </label>
          <div className="relative">
            <Clock
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400"
              size={20}
            />
            <select
              value={rebalanceInterval}
              onChange={(e) => setRebalanceInterval(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-blue-500 transition-all"
            >
              <option value="1">1 minute</option>
              <option value="60">1 hour</option>
              <option value="1440">1 day</option>
              <option value="10080">1 week</option>
            </select>
          </div>
        </div>

        <button
          onClick={onCreateStrategy}
          disabled={!usdcAmount || !wethAmount}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          Create Strategy
          <ChevronRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
};

export default PortfolioSetup;
