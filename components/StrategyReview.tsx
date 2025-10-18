import React from 'react';

interface StrategyReviewProps {
  usdcAmount: string;
  wethAmount: string;
  rebalanceInterval: string;
  onBack: () => void;
  onActivate: () => void;
}

const StrategyReview: React.FC<StrategyReviewProps> = ({
  usdcAmount,
  wethAmount,
  rebalanceInterval,
  onBack,
  onActivate,
}) => {
  const getIntervalText = (hours: string) => {
    if (hours === '1') return '1 hour';
    if (hours === '168') return '7 days';
    return `${hours} hours`;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Confirm Strategy</h2>

        <div className="space-y-4 mb-8">
          <div className="bg-white/5 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-blue-300">USDC Amount</span>
              <span className="text-white font-bold text-xl">${usdcAmount}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-blue-300">WETH Amount</span>
              <span className="text-white font-semibold">
                {wethAmount} WETH
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-blue-300">Rebalancing Type</span>
              <span className="text-white font-semibold">
                Fixed 50/50
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-300">Time Interval</span>
              <span className="text-white font-semibold">{getIntervalText(rebalanceInterval)}</span>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
            <p className="text-yellow-300 text-sm">
              Swap operations will be executed on 1inch. Make sure you have enough ETH for gas fees.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 bg-white/10 text-white font-semibold py-4 rounded-xl hover:bg-white/20 transition-all"
          >
            Back
          </button>
          <button
            onClick={onActivate}
            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            Activate Strategy
          </button>
        </div>
      </div>
    </div>
  );
};

export default StrategyReview;
