import React, { useEffect, useState } from 'react';
import { RefreshCw, ArrowRightLeft } from 'lucide-react';

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

interface Transaction {
  id: string;
  type: string;
  from_token: string;
  to_token: string;
  amount: number;
  timestamp: string;
  status: string;
}

interface ActivePortfolioProps {
  strategy: Strategy;
}

const ActivePortfolio: React.FC<ActivePortfolioProps> = ({ strategy }) => {
  const [timeUntilNext, setTimeUntilNext] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'Initial Setup',
      from_token: 'USDC',
      to_token: 'WETH',
      amount: (strategy.initial_amount * strategy.token_ratio) / 100,
      timestamp: new Date().toISOString(),
      status: 'completed',
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimeUntilNext();
    }, 1000);

    return () => clearInterval(interval);
  }, [strategy]);

  const calculateTimeUntilNext = () => {
    if (!strategy.last_rebalance_at) {
      setTimeUntilNext('Calculating...');
      return;
    }

    const lastRebalance = new Date(strategy.last_rebalance_at);
    const nextRebalance = new Date(
      lastRebalance.getTime() + strategy.rebalance_interval_minutes * 60 * 1000
    );
    const now = new Date();
    const diff = nextRebalance.getTime() - now.getTime();

    if (diff <= 0) {
      setTimeUntilNext('In progress...');
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (hours > 0) {
      setTimeUntilNext(`${hours}h ${minutes}m`);
    } else if (minutes > 0) {
      setTimeUntilNext(`${minutes}m ${seconds}s`);
    } else {
      setTimeUntilNext(`${seconds}s`);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return `${seconds}s ago`;
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-blue-300 mb-4">Asset Allocation</h3>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="20"
                  strokeDasharray={`${strategy.stable_ratio * 2.51} ${(100 - strategy.stable_ratio) * 2.51}`}
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="20"
                  strokeDasharray={`${strategy.token_ratio * 2.51} ${(100 - strategy.token_ratio) * 2.51}`}
                  strokeDashoffset={`-${strategy.stable_ratio * 2.51}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">50/50</p>
                  <p className="text-xs text-blue-300">Balanced</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-white font-medium">USDC</span>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">${strategy.initial_amount}</p>
                <p className="text-green-400 text-sm">{strategy.stable_ratio}%</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-white font-medium">WETH</span>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">{strategy.weth_amount} WETH</p>
                <p className="text-blue-400 text-sm">{strategy.token_ratio}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30">
          <h3 className="text-lg font-semibold text-blue-300 mb-4">Strategy Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-blue-200 text-sm">Total Value</span>
              <span className="text-white text-2xl font-bold">${strategy.initial_amount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-200 text-sm">Next Rebalance</span>
              <span className="text-white text-xl font-semibold">{timeUntilNext}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-200 text-sm">Status</span>
              <div className="flex items-center space-x-2">
                <RefreshCw className="text-green-400 animate-spin" size={16} />
                <span className="text-green-400 font-semibold">Active</span>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-xs text-blue-200 mb-1">Strategy Type</p>
                <p className="text-white font-semibold">Fixed 50/50 Rebalancing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Transaction History</h3>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-white/5 rounded-lg p-4 flex items-center justify-between hover:bg-white/10 transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <ArrowRightLeft className="text-blue-400" size={20} />
                </div>
                <div>
                  <p className="text-white font-semibold">{tx.type}</p>
                  <p className="text-blue-300 text-sm">
                    {tx.from_token} → {tx.to_token}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">${tx.amount.toFixed(2)}</p>
                <p className="text-blue-300 text-sm">{formatDate(tx.timestamp)}</p>
              </div>
            </div>
          ))}
          <div className="bg-white/5 rounded-lg p-4 flex items-center justify-between opacity-50">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-500/20 rounded-full flex items-center justify-center">
                <RefreshCw className="text-gray-400" size={20} />
              </div>
              <div>
                <p className="text-white font-semibold">Pending</p>
                <p className="text-blue-300 text-sm">Next rebalancing operation</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-300 text-sm">{timeUntilNext}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivePortfolio;
