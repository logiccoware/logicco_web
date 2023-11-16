"use client";

import { Spinner } from "@/components/Spinner";
import { useEffect } from "react";
import { stringResources } from "@/stringResources";
import { useRouter } from "next/navigation";
import { useLogout } from "@/features/Logout/components/hooks/useLogout";
import { LOGIN_ROUTE } from "@/domain/routes";

export function ClientSideLogout() {
  const { replace, refresh } = useRouter();
  const { handleLogout } = useLogout({
    handleSuccess: () => {
      replace(LOGIN_ROUTE);
      refresh();
    },
  });
  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="m-4">
      <div className="flex justify-center items-center gap-2 mt-4">
        <div>
          <Spinner />
        </div>
        <div>{stringResources.logoutPage.message}</div>
      </div>
    </div>
  );
}
