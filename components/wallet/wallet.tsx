import { useUserInfo } from "@/hooks/use-user-info";
import { userHasWallet } from "@civic/auth-web3";
import { useUser } from "@civic/auth-web3/react";

export const Wallet = () => {
  const { user } = useUserInfo();
  const userContext = useUser();

  if (!userContext.user) return <div>Non sei loggato</div>;

  if (userHasWallet(userContext)) {
    return <div>Indirizzo wallet: {userContext.ethereum.address}</div>;
  } else {
    return <div>Wallet non ancora creato</div>;
  }
  return (
    <div className="flex w-full flex-col justify-center items-center">
      <h1 className="text-4xl">WALLET</h1>
      <h1 className="text-xl">{user.userName}</h1>
    </div>
  );
};
