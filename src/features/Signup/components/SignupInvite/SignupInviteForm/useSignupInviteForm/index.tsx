import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupInviteForm } from "@/features/Signup/types";
import { signUpInviteValidationSchema } from "@/features/Signup/data/signupInviteFormValidationSchema";
import { useMutation } from "@tanstack/react-query";
import { signUpInviteService } from "@/domain/signup/services";
import { UseSignupInviteFormProps } from "@/features/Signup/components/SignupInvite/SignupInviteForm/useSignupInviteForm/types";
import { useRouter } from "next/navigation";
import { LOGIN_ROUTE } from "@/domain/routes";
import { useToast } from "@/components/ui/use-toast";
import { SignupInviteMutationVariables } from "@/features/Signup/types";

export function useSignupInviteForm({ inviteData }: UseSignupInviteFormProps) {
  const { replace } = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInviteForm>({
    resolver: yupResolver(signUpInviteValidationSchema),
  });

  const signupInviteMutation = useMutation({
    mutationFn: ({ payload }: SignupInviteMutationVariables) =>
      signUpInviteService.signupInvite(payload),
    onSuccess: () => handleSignupInviteSuccess(),
    onError: (e) => handleSignupInviteFailure(e),
  });

  function handleSignupInviteSuccess() {
    replace(LOGIN_ROUTE);
  }

  function handleSignupInviteFailure(error: unknown) {
    toast({
      title: "Error",
      description: "Something went wrong, please try again later.",
      variant: "destructive",
    });
  }

  function onSubmitForm(data: SignupInviteForm) {
    signupInviteMutation.mutate({
      payload: {
        inviteCode: inviteData.code,
        password: data.password,
        displayName: data.displayName,
      },
    });
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmitForm,
    isLoading: signupInviteMutation.isPending,
  };
}
