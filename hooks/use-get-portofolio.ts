import { useQuery } from "@tanstack/react-query";

const REFETCH_INTERVAL = 5000;

export const useGetPorftoflio = () => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["get-portfolio"],
    queryFn: () => {},
    refetchInterval: REFETCH_INTERVAL,
  });

  return { data, isSuccess, isLoading };
};
