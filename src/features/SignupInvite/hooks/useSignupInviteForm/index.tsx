import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupInviteForm } from "@/features/SignupInvite/types";
import { signUpInviteValidationSchema } from "@/features/SignupInvite/data/signupInviteFormValidationSchema";
import { useMutation } from "@tanstack/react-query";
import { SignupInvitePayload } from "@/domain/signup/types";
import { signUpInviteService } from "@/domain/signup/services";
import { UseSignupInviteFormProps } from "@/features/SignupInvite/hooks/useSignupInviteForm/types";

export function useSignupInviteForm({ inviteData }: UseSignupInviteFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInviteForm>({
    resolver: yupResolver(signUpInviteValidationSchema),
  });

  const signupInviteMutation = useMutation({
    mutationFn: (payload: SignupInvitePayload) =>
      signUpInviteService.signupInvite(payload),
    onSuccess: () => handleSignupInviteSuccess(),
    onError: (e) => handleSignupInviteFailure(e),
  });

  function handleSignupInviteSuccess() {
    console.log("Success");
  }

  function handleSignupInviteFailure(error: unknown) {
    console.log(error);
  }

  function onSubmitForm(data: SignupInviteForm) {
    signupInviteMutation.mutate({
      inviteCode: inviteData.code,
      password: data.password,
      displayName: data.displayName,
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
