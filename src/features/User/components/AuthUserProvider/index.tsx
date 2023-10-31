"use client";

import { createActorContext } from "@xstate/react";
import { authUserMachine } from "@/features/User/store/authUserMachine";
import { PropsWithChildren } from "react";
import { AuthUserSubscription } from "@/features/User/components/AuthUserSubscription";

export const AuthUserContext = createActorContext(authUserMachine);

export type PagePermission = "public" | "protected" | "anonymous-only";

interface AuthUserProviderProps extends PropsWithChildren {
  pagePermission?: PagePermission;
}

export function AuthUserProvider({
  children,
  pagePermission,
}: AuthUserProviderProps) {
  return (
    <AuthUserContext.Provider>
      <AuthUserSubscription pagePermission={pagePermission}>
        {children}
      </AuthUserSubscription>
    </AuthUserContext.Provider>
  );
}
