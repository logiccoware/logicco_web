import { firebaseAuthService } from "@/domain/firebase/services";
import { PropsWithChildren, useEffect } from "react";
import { useAuthUser } from "@/features/User/hooks/useAuthUser";
import { useRouter } from "next/navigation";
import { PagePermission } from "@/features/User/components/AuthUserProvider";
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from "@/domain/routes";
import { AuthUserModel } from "@/domain/user/models";
import { assertDecode } from "@/lib/helpers/asserDecode";

interface AuthUserSubscriptionProps extends PropsWithChildren {
  pagePermission?: PagePermission;
}

function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar Skeleton */}
      <div className="bg-black h-12 w-full"></div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-4">
        <div className="bg-black h-8 w-3/4"></div>
        <div className="bg-black h-8 w-1/2"></div>
        <div className="bg-black h-8 w-2/3"></div>
        <div className="bg-black h-8 w-1/4"></div>
        <div className="bg-black h-8 w-1/3"></div>
      </div>

      {/* Footer Skeleton */}
      <div className="bg-black h-16 w-full mt-auto"></div>
    </div>
  );
}

export function AuthUserSubscription({
  children,
  pagePermission,
}: AuthUserSubscriptionProps) {
  const { handleSetAuthUser, isLoading } = useAuthUser();
  const { replace } = useRouter();

  useEffect(() => {
    const firebaseAuthSubscription = firebaseAuthService
      .getAuth()
      .onAuthStateChanged((user) => {
        if (user) {
          const authUser = {
            email: user.email,
            displayName: user.displayName,
          };
          console.log("User is authenticated", authUser);
          handleSetAuthUser(
            assertDecode(
              AuthUserModel.decode(authUser),
              "Failed to decode AuthUserModel"
            )
          );
          if (pagePermission === "anonymous-only") {
            replace(DASHBOARD_ROUTE);
          }
        } else {
          handleSetAuthUser(undefined);
          if (pagePermission === "protected") {
            replace(LOGIN_ROUTE);
          }
          console.log("User is unauthenticated");
        }
      });

    return () => firebaseAuthSubscription();
  }, []);

  return children;
}
