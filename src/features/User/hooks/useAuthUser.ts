import { AuthUser } from "@/domain/user/models";
import { AuthUserContext } from "@/features/User/components/AuthUserProvider";

export function useAuthUser() {
  const authUserActorRef = AuthUserContext.useActorRef();
  const user = AuthUserContext.useSelector((state) => state.context.user);
  const isLoading = AuthUserContext.useSelector(
    (state) => state.context.isLoading
  );
  const isUserAuthenticated = Boolean(user && user.email);

  function handleSetAuthUser(user?: AuthUser) {
    authUserActorRef.send({ type: "auth.setUser", user });
  }

  return {
    handleSetAuthUser,
    user,
    isUserAuthenticated,
    isLoading,
  };
}
