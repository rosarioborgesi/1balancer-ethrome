import { useState } from "react";
import Header from "./Header";
import ActivePortfolio from "./ActivePortfolio";
import ConfirmationModal from "./ConfirmationModal";
import PortfolioSetup from "./PortfolioSetup";
import LandingPage from "./LandingPage";
import { useUser } from "@civic/auth-web3/react";

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
  const [isConnected, setIsConnected] = useState(false);
  const [usdcAmount, setUsdcAmount] = useState("");
  const [wethAmount, setWethAmount] = useState("");
  const [rebalanceInterval, setRebalanceInterval] = useState("1440");
  const [showModal, setShowModal] = useState(false);
  const [activeStrategy, setActiveStrategy] = useState<Strategy | null>(null);
  const { user } = useUser();
  console.log("======>", user);

  const handleCreateStrategy = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
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
    setActiveStrategy(strategy);
    setShowModal(false);
  };

  if (!user) {
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
