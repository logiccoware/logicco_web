import { useContext } from "react";
import UserContext from "@/features/User/components/AuthUserContext";

// Hook to use the user context
export const useAuthUser = () => {
    const context = useContext(UserContext);
    const { user } = context;
    const isAuthenticated = Boolean(user);
    if (!context) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return {
      user,
      isAuthenticated,
    };
  };