import { CivicAuthProvider } from "@civic/auth-web3/react";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <CivicAuthProvider clientId={"7569d678-d9a6-4b3c-8e8a-15438472a57c"}>
      {children}
    </CivicAuthProvider>
  );
};
