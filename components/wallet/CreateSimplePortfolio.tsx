"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, DollarSign } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Button } from "@/components/shared/ui/button";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Input } from "@/components/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shared/ui/select";
import { savePortfolio } from "@/utils/storage/constants";

interface CreateSimplePortfolioProps {
  onBack?: () => void;
}

export function CreateSimplePortfolio({ onBack }: CreateSimplePortfolioProps) {
  const router = useRouter();
  const [strategyName, setStrategyName] = useState("");
  const [usdcAmount, setUsdcAmount] = useState("");
  const [wethAmount, setWethAmount] = useState("");
  const [timeInterval, setTimeInterval] = useState<"weekly" | "monthly" | "quarterly" | "semi-annual">("weekly");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreatePortfolio = async () => {
    // Validation
    const usdcValue = parseFloat(usdcAmount);
    const wethValue = parseFloat(wethAmount);

    if (!strategyName.trim()) {
      toast.error("Please enter a strategy name");
      return;
    }

    if (!usdcAmount || !wethAmount || isNaN(usdcValue) || isNaN(wethValue)) {
      toast.error("Please enter valid amounts for both USDC and WETH");
      return;
    }

    if (usdcValue <= 0 || wethValue <= 0) {
      toast.error("Amounts must be greater than 0");
      return;
    }

    setIsCreating(true);

    try {
      // Calculate total value
      const totalValue = usdcValue + wethValue;

      // Create allocations
      const allocations = [
        {
          symbol: "USDC",
          name: "USD Coin",
          percentage: 50,
          amount: usdcValue,
          color: "#2775CA",
        },
        {
          symbol: "WETH",
          name: "Wrapped Ether",
          percentage: 50,
          amount: wethValue,
          color: "#627EEA",
        },
      ];

      // Create portfolio with 50/50 allocation
      const portfolio = {
        id: `portfolio_${Date.now()}`,
        name: strategyName.trim(),
        type: "time",
        allocations: allocations,
        totalInvestment: totalValue,
        performance: {
          totalValue: totalValue,
          totalReturn: 0,
          returnPercentage: 0,
        },
        config: {
          rebalanceFrequency: timeInterval,
          description: "Balanced USDC/WETH portfolio with 50/50 allocation",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save portfolio to both storage keys for compatibility
      await savePortfolio(portfolio);
      
      // Also save to 1balancer-portfolios for Portfolio and Profile pages
      const existingPortfolios = localStorage.getItem("1balancer-portfolios");
      const portfolios = existingPortfolios ? JSON.parse(existingPortfolios) : [];
      portfolios.push(portfolio);
      localStorage.setItem("1balancer-portfolios", JSON.stringify(portfolios));

      // Emit event to notify other components about the new portfolio
      window.dispatchEvent(new CustomEvent("portfolio-created", { detail: portfolio }));

      toast.success("Portfolio created successfully!", {
        description: `"${strategyName}" with ${timeInterval} rebalancing is ready`,
      });

      // Navigate back to wallet
      setTimeout(() => {
        router.push("/wallet");
      }, 1000);
    } catch (error) {
      console.error("Error creating portfolio:", error);
      toast.error("Failed to create portfolio", {
        description: "Please try again",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push("/wallet");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={handleBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Create Portfolio</h1>
          <p className="text-muted-foreground mt-2">
            Create a balanced USDC/WETH portfolio with automatic rebalancing
          </p>
        </div>

        {/* Main Form */}
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Strategy Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Strategy Name</label>
              <Input
                type="text"
                placeholder="e.g., My USDC/WETH Strategy"
                value={strategyName}
                onChange={(e) => setStrategyName(e.target.value)}
                maxLength={50}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Give your strategy a memorable name
              </p>
            </div>

            {/* USDC Amount */}
            <div>
              <label className="block text-sm font-medium mb-2">USDC Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="0.00"
                  value={usdcAmount}
                  onChange={(e) => setUsdcAmount(e.target.value)}
                  className="pl-10"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            {/* WETH Amount */}
            <div>
              <label className="block text-sm font-medium mb-2">WETH Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">Ξ</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={wethAmount}
                  onChange={(e) => setWethAmount(e.target.value)}
                  className="pl-10"
                  step="0.0001"
                  min="0"
                />
              </div>
            </div>

            {/* Rebalancing Strategy */}
            <div>
              <label className="block text-sm font-medium mb-2">Rebalancing Strategy</label>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border/30 bg-accent/5">
                <span className="font-medium">Fixed 50/50</span>
                <span className="text-sm text-muted-foreground">50% USDC / 50% WETH</span>
              </div>
            </div>

            {/* Time Interval */}
            <div>
              <label className="block text-sm font-medium mb-2">Time Interval</label>
              <Select value={timeInterval} onValueChange={(value: any) => setTimeInterval(value)}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">1 day</span>
                      <span className="text-xs text-muted-foreground">Rebalance weekly</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="monthly">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Monthly</span>
                      <span className="text-xs text-muted-foreground">Rebalance every month</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="quarterly">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Quarterly</span>
                      <span className="text-xs text-muted-foreground">Rebalance every 3 months</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="semi-annual">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Semi-Annual</span>
                      <span className="text-xs text-muted-foreground">Rebalance every 6 months</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Create Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleCreatePortfolio}
                disabled={isCreating}
                className="w-full h-12 text-base"
                size="lg"
              >
                {isCreating ? "Creating..." : "Create Strategy"}
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
