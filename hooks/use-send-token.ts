import { erc20Abi } from "viem";
import { useWriteContract } from "wagmi";

export function useSendToken() {
  const { writeContractAsync, isPending, isSuccess } = useWriteContract();

  const sendToken = async (
    tokenAddress: `0x${string}`,
    to: `0x${string}`,
    amount: bigint
  ) => {
    await writeContractAsync({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "transfer",
      args: [to, amount],
    });
  };

  return { sendToken, isSuccess, isPending };
}
