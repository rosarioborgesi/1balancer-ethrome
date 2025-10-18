import React from "react";
import { useDisconnect } from "wagmi";
import { useIsInMiniApp } from "@coinbase/onchainkit/minikit";
import Image from "next/image";
import OneBalancerLogo from "../assets/1balancer.png";

const Header: React.FC = () => {
  const { disconnect } = useDisconnect();
  const { isInMiniApp } = useIsInMiniApp();
  return (
    <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-32 h-12 rounded-lg flex items-center justify-center">
            <Image src={OneBalancerLogo} alt="One balancer logo" />
          </div>
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
