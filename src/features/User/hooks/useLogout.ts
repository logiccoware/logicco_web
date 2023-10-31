import { firebaseAuthService } from "@/domain/firebase/services";
import { useAuthUser } from "./useAuthUser";
import { useRouter } from "next/navigation";
import { LOGIN_ROUTE } from "@/domain/routes";

export function useLogout() {
  const { handleSetAuthUser } = useAuthUser();
  const { replace } = useRouter();

  async function handleLogout() {
    await firebaseAuthService.getAuth().signOut();
    handleSetAuthUser(undefined);
    replace(LOGIN_ROUTE);
  }

  return {
    handleLogout,
  };
}
