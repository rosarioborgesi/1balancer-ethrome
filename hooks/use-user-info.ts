import { useUser } from "@civic/auth/react";
import { useProfile } from "@farcaster/auth-kit";

export const useUserInfo = () => {
  const { user: userCivic } = useUser();
  const { isAuthenticated: isAuthenticatedWithFarcaster, profile } =
    useProfile();

  const isUserAuthenticated = !!userCivic || isAuthenticatedWithFarcaster;

  const user = {
    userName: userCivic?.username || profile.username,
    userImg: userCivic?.picture || profile.pfpUrl,
  };

  return { isUserAuthenticated, user };
};
