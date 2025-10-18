import React from 'react';
import { X, AlertCircle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  usdcAmount: string;
  wethAmount: string;
  rebalanceInterval: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  usdcAmount,
  wethAmount,
  rebalanceInterval,
}) => {
  if (!isOpen) return null;

  const getIntervalText = (minutes: string) => {
    const min = parseInt(minutes);
    if (min === 1) return '1 minute';
    if (min === 60) return '1 hour';
    if (min === 1440) return '1 day';
    if (min === 10080) return '1 week';
    return `${minutes} minutes`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl border border-white/10 shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">Confirm Strategy</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-white/5 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-blue-300 text-sm">USDC Amount</span>
              <span className="text-white font-semibold">${usdcAmount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-300 text-sm">WETH Amount</span>
              <span className="text-white font-semibold">{wethAmount} WETH</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-300 text-sm">Strategy</span>
              <span className="text-white font-semibold">50/50 Rebalancing</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-300 text-sm">Interval</span>
              <span className="text-white font-semibold">{getIntervalText(rebalanceInterval)}</span>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-start space-x-3">
            <AlertCircle className="text-yellow-400 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-yellow-300 text-sm">
              By confirming, you authorize the automated rebalancing of your portfolio. Make sure you have sufficient ETH for gas fees.
            </p>
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="flex-1 bg-white/10 text-white font-semibold py-3 rounded-xl hover:bg-white/20 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
