'use client';

import React, { createContext, PropsWithChildren } from "react";

interface IAuthContext {
  isLogged: boolean;
}

// Create the context with default values
export const AuthContext = createContext<IAuthContext>({ isLogged : false });

export const AuthProvider = ({
  children,
  isLogged,
}: PropsWithChildren<IAuthContext>) => {
  return <AuthContext value={{ isLogged }}>{children}</AuthContext>;
};
