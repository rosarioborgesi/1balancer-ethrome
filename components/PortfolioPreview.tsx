import React from 'react';
import { TrendingUp, Clock } from 'lucide-react';

interface PortfolioPreviewProps {
  usdcAmount: string;
  wethAmount: string;
  rebalanceInterval: string;
}

const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({
  usdcAmount,
  wethAmount,
  rebalanceInterval,
}) => {
  const usdc = parseFloat(usdcAmount) || 0;
  const weth = parseFloat(wethAmount) || 0;

  const getIntervalText = (hours: string) => {
    if (hours === '1') return '1 hour';
    if (hours === '168') return '7 days';
    return `${hours} hours`;
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
      <h3 className="text-xl font-bold text-white mb-6">Portfolio Preview</h3>

      {usdcAmount && wethAmount ? (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/30">
            <div className="text-center mb-4">
              <p className="text-blue-300 text-sm mb-2">Total Value</p>
              <p className="text-4xl font-bold text-white">${usdc.toFixed(2)}</p>
              <p className="text-blue-200 text-sm mt-2">{weth.toFixed(4)} WETH</p>
            </div>
            <div className="h-4 bg-white/10 rounded-full overflow-hidden flex">
              <div className="bg-gradient-to-r from-green-400 to-green-500" style={{ width: '50%' }}></div>
              <div className="bg-gradient-to-r from-blue-400 to-cyan-500" style={{ width: '50%' }}></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
              <div>
                <p className="text-blue-300 text-sm">USDC Allocation</p>
                <p className="text-white font-semibold text-lg">${usdc.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-bold text-xl">50%</p>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
              <div>
                <p className="text-blue-300 text-sm">WETH Allocation</p>
                <p className="text-white font-semibold text-lg">{weth.toFixed(4)} WETH</p>
              </div>
              <div className="text-right">
                <p className="text-blue-400 font-bold text-xl">50%</p>
              </div>
            </div>
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
            <p className="text-cyan-300 text-sm">
              <Clock className="inline mr-2" size={16} />
              Rebalancing every {getIntervalText(rebalanceInterval)}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <TrendingUp className="mx-auto text-blue-400/30 mb-4" size={64} />
          <p className="text-blue-300/60">Configure your portfolio to see the preview</p>
        </div>
      )}
    </div>
  );
};

export default PortfolioPreview;
