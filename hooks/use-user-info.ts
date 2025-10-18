import { userHasWallet } from "@civic/auth-web3";
import { useUser } from "@civic/auth-web3/react";
import { useProfile } from "@farcaster/auth-kit";

export const useUserInfo = () => {
  const { user: userCivic } = useUser();
  const { isAuthenticated: isAuthenticatedWithFarcaster, profile } =
    useProfile();
  // console.log("===== userCivic:", userCivic);
  // console.log("===== profile:", profile);

  const isUserAuthenticated = !!userCivic || isAuthenticatedWithFarcaster;

  const user = {
    userName: userCivic?.name ?? profile.username,
    userImg: userCivic?.picture ?? profile.pfpUrl,
    address: (userCivic as any)?.address ?? (userCivic as any)?.wallet?.address ?? profile.custody,
  };

  return { isUserAuthenticated, user };
};
