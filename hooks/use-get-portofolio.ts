import { REBALANCER_WALLET } from "@/config/constants";
import { getTokensSnapshot } from "@/lib/actions/portfolio";
import { useQuery } from "@tanstack/react-query";
import { base } from "viem/chains";

const REFETCH_INTERVAL = 5000;

export const useGetPorftoflio = () => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["get-portfolio"],
    queryFn: () => getTokensSnapshot(base.id.toString(), REBALANCER_WALLET),
    refetchInterval: REFETCH_INTERVAL,
  });

  return { data, isSuccess, isLoading };
};
