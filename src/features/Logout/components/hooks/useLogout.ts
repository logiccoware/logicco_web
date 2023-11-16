import { useMutation } from "@tanstack/react-query";
import { userService } from "@/domain/user/services";

type UseLogoutProps = {
  handleSuccess: () => void;
};

export function useLogout({ handleSuccess }: UseLogoutProps) {
  const logoutMutation = useMutation({
    mutationFn: () => userService.logout(),
    onSuccess: () => {
      handleSuccess();
    },
    onError: (e) => {
      console.log(e);
    },
  });

  function handleLogout() {
    logoutMutation.mutate();
  }

  return {
    handleLogout,
    isLoading: logoutMutation.isPending,
    hasError: logoutMutation.isError,
  };
}
