import { REBALANCER_WALLET } from "@/config/constants";
import { getTokensSnapshot } from "@/lib/actions/portfolio";
import { useQuery } from "@tanstack/react-query";
import { base } from "viem/chains";

const REFETCH_INTERVAL = 5 * 60 * 1000; // 5 minutes

interface TokenData {
  address: string;
  asset_sign: number;
  block_number: number | null;
  block_number_created: number;
  chain: number;
  contract_address: string;
  contract_name: string;
  contract_symbol: string;
  index: string;
  locked: boolean;
  protocol_group_icon: string;
  protocol_group_id: string;
  protocol_group_name: string;
  protocol_handler_id: string;
  protocol_sub_group_id: string | null;
  protocol_sub_group_name: string | null;
  protocol_type: string;
  reward_tokens: any[]; // You might want to define a more specific type for this
  status: number;
  timestamp: number | null;
  token_id: number;
  underlying_tokens: any[]; // You might want to define a more specific type for this
  value_usd: number;
}


export const useGetPorftoflio = () => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["get-portfolio"],
    queryFn: () => getTokensSnapshot(base.id.toString(), REBALANCER_WALLET),
    refetchInterval: REFETCH_INTERVAL,
  });
  const result: TokenData[] = Array.isArray((data as any)?.result)
    ? (data as any).result
    : [];

  const usdcAmount = result.filter((item) => item.contract_symbol === "USDC")[0]?.value_usd;
  const wethAmount = result.filter((item) => item.contract_symbol === "WETH")[0]?.value_usd;
  const totalAmount = (usdcAmount ?? 0) + (wethAmount ?? 0);

  return { usdcAmount, wethAmount, totalAmount, isSuccess, isLoading };
};
