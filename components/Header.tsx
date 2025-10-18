import React from "react";
import { RefreshCw } from "lucide-react";
import { useDisconnect } from "wagmi";
import { useIsInMiniApp } from "@coinbase/onchainkit/minikit";

const Header: React.FC = () => {
  const { disconnect } = useDisconnect();
  const { isInMiniApp } = useIsInMiniApp();
  return (
    <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-lg flex items-center justify-center">
            <RefreshCw className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold text-white">1balancer</span>
        </div>
        {!isInMiniApp && (
          <button
            className="w-32 px-6 py-2 text-white bg-gray-800/50 rounded-xl cursor-pointer"
            onClick={() => disconnect()}
          >
            SignOut
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
