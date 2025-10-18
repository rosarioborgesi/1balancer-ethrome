import { DappLogin } from "@/components/shared/ui/dapp-login";
import { Wallet } from "@/components/wallet/wallet";
import { useUserInfo } from "@/hooks/use-user-info";

export const OneBalancerController = () => {
  const { isUserAuthenticated } = useUserInfo();

  if (!isUserAuthenticated) return <DappLogin />;

  return <Wallet />;
};
