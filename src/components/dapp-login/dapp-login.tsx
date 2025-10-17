import { UserButton } from "@civic/auth/react";
import { SignInButton } from "@farcaster/auth-kit";
import "@farcaster/auth-kit/styles.css";

export const DappLogin = () => {
  return (
    <div className="h-screen flex w-full flex-col justify-center items-center gap-y-4">
      <h1 className="text-5xl">CIAO</h1>
      <UserButton />
      <SignInButton />
    </div>
  );
};
