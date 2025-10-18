import { useState } from "react";
import Header from "./Header";
import ActivePortfolio from "./ActivePortfolio";
import ConfirmationModal from "./ConfirmationModal";
import PortfolioSetup from "./PortfolioSetup";
import LandingPage from "./LandingPage";
import { useAccount } from "wagmi";
import { parseEther, parseUnits } from "viem";
import { useSendToken } from "@/hooks/use-send-token";
import {
  REBALANCER_WALLET,
  USDC_ADDRESS_BASE,
  WETH_ADDRESS_BASE,
} from "@/config/constants";
import { useComposeCast } from "@coinbase/onchainkit/minikit";
import { ROOT_URL } from "@/minikit.config";

interface Strategy {
  stablecoin: string;
  token: string;
  initial_amount: number;
  weth_amount: number;
  stable_ratio: number;
  token_ratio: number;
  rebalance_interval_minutes: number;
  last_rebalance_at: string;
}

const Main: React.FC = () => {
  const [usdcAmount, setUsdcAmount] = useState("");
  const [wethAmount, setWethAmount] = useState("");
  const [rebalanceInterval, setRebalanceInterval] = useState("1440");
  const [showModal, setShowModal] = useState(false);
  const [activeStrategy, setActiveStrategy] = useState<Strategy | null>(null);

  const { isConnected } = useAccount();
  const { sendToken: sendUSDC, isSuccess: isUSDCSuccess } = useSendToken();
  const { sendToken: sendWETH, } = useSendToken();
  const { composeCast } = useComposeCast();
  const handleCreateStrategy = async () => {
    try {
      if (Number(usdcAmount) <= 0) throw new Error("No USDC found");
      await sendUSDC(
        USDC_ADDRESS_BASE,
        REBALANCER_WALLET,
        parseUnits(usdcAmount, 6)
      );
      if (Number(wethAmount) > 0) {
        await sendWETH(
          WETH_ADDRESS_BASE,
          REBALANCER_WALLET,
          parseEther(wethAmount)
        );
      }
      if (isUSDCSuccess) setShowModal(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : (error as string);
      console.error(message);
    }
  };

  const strategy: Strategy = {
    stablecoin: "USDC",
    token: "WETH",
    initial_amount: parseFloat(usdcAmount),
    weth_amount: parseFloat(wethAmount),
    stable_ratio: 50,
    token_ratio: 50,
    rebalance_interval_minutes: parseInt(rebalanceInterval),
    last_rebalance_at: new Date().toISOString(),
  };

  const handleConfirm = async () => {
    setActiveStrategy(strategy);
    setShowModal(false);
    await composeCast({
      text: "I have just create a strategy with 1balancer",
      embeds: [ROOT_URL],
    });
  };

  const handleViewPortfolio = () => {
    setActiveStrategy(strategy);
  };

  if (!isConnected) {
    return <LandingPage />;
  }

  if (activeStrategy) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Header />
        <div className="max-w-6xl mx-auto px-6 py-12">
          <ActivePortfolio strategy={activeStrategy} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <PortfolioSetup
          usdcAmount={usdcAmount}
          setUsdcAmount={setUsdcAmount}
          wethAmount={wethAmount}
          setWethAmount={setWethAmount}
          rebalanceInterval={rebalanceInterval}
          setRebalanceInterval={setRebalanceInterval}
          onCreateStrategy={handleCreateStrategy}
          onShowPortfolio={handleViewPortfolio}
        />
      </div>

      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        usdcAmount={usdcAmount}
        wethAmount={wethAmount}
        rebalanceInterval={rebalanceInterval}
      />
    </div>
  );
};

export default Main;
