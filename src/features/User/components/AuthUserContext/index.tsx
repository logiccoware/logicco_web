'use client';
import { AuthUser } from '@/domain/user/models';
import React, { createContext, useContext } from 'react';


interface UserContextType {
  user?: AuthUser;
}

const UserContext = createContext<UserContextType>({});

interface UserProviderProps {
  children: React.ReactNode;
  user?: AuthUser;
}

export const AuthUserProvider: React.FC<UserProviderProps> = ({ children, user }) => {
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
