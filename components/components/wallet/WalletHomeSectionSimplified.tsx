"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PortfolioSection } from "../portfolio/PortfolioSection";
import { UserProfileSection } from "../profile/UserProfileSection";
import { TradeSection } from "../trade/TradeSection";
import { TemplateSelectionModal } from "../wallet/TemplateSelectionModal";
import {
  ArrowRight,
  BarChart3,
  Crown,
  DollarSign,
  PieChart,
  Rocket,
  Shield,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shared/ui/card";
import { initializeDefaultPortfolios } from "@/utils/storage/constants";

interface WalletHomeSectionProps {
  activeWalletTab: "home" | "portfolio" | "trade" | "profile";
  onWalletTabChange: (tab: "home" | "portfolio" | "trade" | "profile") => void;
}

export function WalletHomeSectionSimplified({ activeWalletTab }: WalletHomeSectionProps) {
  const router = useRouter();
  const [defaultPortfolios, setDefaultPortfolios] = useState<any[]>([]);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  // Load default portfolios on component mount
  useEffect(() => {
    try {
      const portfolios = initializeDefaultPortfolios();
      setDefaultPortfolios(portfolios);

      // Clean up any duplicate portfolios that might exist
      cleanupDuplicatePortfolios();
    } catch (error) {
      console.error("Error loading default portfolios:", error);
    }
  }, []);

  // Function to clean up duplicate portfolios
  const cleanupDuplicatePortfolios = () => {
    try {
      // Clean user-portfolios
      const userPortfolios = localStorage.getItem("user-portfolios");
      if (userPortfolios) {
        const parsed = JSON.parse(userPortfolios);
        if (Array.isArray(parsed)) {
          const uniquePortfolios = parsed.reduce((acc: any[], current: any) => {
            if (current.id && !acc.some(p => p.id === current.id)) {
              acc.push(current);
            }
            return acc;
          }, []);

          if (uniquePortfolios.length !== parsed.length) {
            localStorage.setItem("user-portfolios", JSON.stringify(uniquePortfolios));
            console.log(
              `🧹 Cleaned ${parsed.length - uniquePortfolios.length} duplicate portfolios from user-portfolios`,
            );
          }
        }
      }

      // Clean 1balancer-portfolios
      const savedPortfolios = localStorage.getItem("1balancer-portfolios");
      if (savedPortfolios) {
        const parsed = JSON.parse(savedPortfolios);
        if (Array.isArray(parsed)) {
          const uniquePortfolios = parsed.reduce((acc: any[], current: any) => {
            if (current.id && !acc.some(p => p.id === current.id)) {
              acc.push(current);
            }
            return acc;
          }, []);

          if (uniquePortfolios.length !== parsed.length) {
            localStorage.setItem("1balancer-portfolios", JSON.stringify(uniquePortfolios));
            console.log(
              `🧹 Cleaned ${parsed.length - uniquePortfolios.length} duplicate portfolios from 1balancer-portfolios`,
            );
          }
        }
      }
    } catch (error) {
      console.error("Error cleaning duplicate portfolios:", error);
    }
  };

  // Listen for navigation events from other components
  // Event listener for navigating to create portfolio page (from external triggers)
  useEffect(() => {
    const handleNavigateToPieChart = () => {
      router.push("/wallet/create-portfolio");
    };

    window.addEventListener("navigate-to-pie-chart", handleNavigateToPieChart);

    return () => {
      window.removeEventListener("navigate-to-pie-chart", handleNavigateToPieChart);
    };
  }, [router]);

  // Handle template selection from template modal
  const handleTemplateSelection = useCallback(() => {
    setShowTemplateModal(false);
  }, []);

  // Show different content based on active tab
  if (activeWalletTab === "portfolio") {
    return <PortfolioSection />;
  }

  if (activeWalletTab === "trade") {
    return <TradeSection />;
  }

  if (activeWalletTab === "profile") {
    return <UserProfileSection />;
  }

  // PieChartCreator is now accessible at /wallet/create-portfolio page
  // if (showPieChartCreator) {
  //   return <PieChartCreator onBack={() => setShowPieChartCreator(false)} />;
  // }

  // Home tab content
  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-6 py-6 space-y-8">
        {/* Welcome Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 py-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20">
            <Sparkles className="w-4 h-4 text-teal-500" />
            <span className="text-sm font-medium text-teal-600 dark:text-teal-400">Portfolio Management Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Build Your Perfect
            <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent"> Portfolio</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create custom portfolios or choose from our professionally crafted strategies. Start building your DeFi
            investment future today.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="border border-border/50 bg-card/80 backdrop-blur-sm h-full shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Value</span>
                  <DollarSign className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-foreground">$0.00</p>
                <p className="text-xs text-muted-foreground mt-1">Ready to invest</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border border-border/50 bg-card/80 backdrop-blur-sm h-full shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Portfolios</span>
                  <PieChart className="w-4 h-4 text-cyan-500" />
                </div>
                <p className="text-2xl font-bold text-foreground">{defaultPortfolios.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Ready strategies</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border border-border/50 bg-card/80 backdrop-blur-sm h-full shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Assets</span>
                  <BarChart3 className="w-4 h-4 text-purple-500" />
                </div>
                <p className="text-2xl font-bold text-foreground">60+</p>
                <p className="text-xs text-muted-foreground mt-1">ERC-20 tokens</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border border-border/50 bg-card/80 backdrop-blur-sm h-full shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Rebalancing</span>
                  <Target className="w-4 h-4 text-orange-500" />
                </div>
                <p className="text-2xl font-bold text-foreground">Auto</p>
                <p className="text-xs text-muted-foreground mt-1">Drift & Time based</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Create Portfolio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Start Your Investment Journey</h2>
            <p className="text-muted-foreground">Choose how you want to build your portfolio</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Custom Portfolio Creation */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card
                className="relative overflow-hidden border border-border/30 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm hover:from-card/90 hover:to-card/70 transition-all duration-300 group cursor-pointer h-full"
                onClick={() => {
                  router.push("/wallet/create-portfolio");
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="relative z-10 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                      Create Custom Portfolio
                    </CardTitle>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                      <PieChart className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    Build your own investment strategy from scratch
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 pt-4 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Create custom allocation charts, choose from 60+ ERC-20 tokens, set precise percentages, and
                    configure automated rebalancing.
                  </p>

                  <div className="flex items-center gap-2 text-teal-500 group-hover:text-teal-400 transition-colors">
                    <span className="text-sm font-medium">Start Building</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          
          </div>
        </motion.div>
      </div>

      {/* Template Selection Modal */}
      <TemplateSelectionModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        templates={defaultPortfolios}
        onSelect={handleTemplateSelection}
      />
    </div>
  );
}
