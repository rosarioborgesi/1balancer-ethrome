import { useQuery } from "@tanstack/react-query";
import { getBasenameName } from "@/lib/utils";
import { Address } from "viem";

export const useGetBasename = (address: Address) => {
  return useQuery({
    queryKey: ["get-basename", address],
    queryFn: async () => {
      const baseName = await getBasenameName(address);
      console.log("Base name resolved:", baseName);
      return baseName;
    },
    enabled: !!address, // Only run if address is provided
  });
};