import { UserButton } from "@civic/auth-web3/react";
import { SignInButton } from "@farcaster/auth-kit";
import "@farcaster/auth-kit/styles.css";

export const DappLogin = () => {
  return (
    <div className="h-screen flex w-full flex-col justify-center items-center gap-y-4">
      <UserButton />
      <SignInButton />
    </div>
  );
};
