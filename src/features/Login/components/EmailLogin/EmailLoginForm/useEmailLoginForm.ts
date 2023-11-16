import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { emailLoginValidationSchema } from "@/features/Login/data/emailLoginFormValidationSchema";
import { EmailLoginForm } from "@/features/Login/types";
import { loginService } from "@/domain/login/services";
import { EmailLoginPayload } from "@/domain/login/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface EmailLoginMutationVariables {
  payload: EmailLoginPayload;
}


export function useEmailLoginForm() {
  const { replace } = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailLoginForm>({
    resolver: yupResolver(emailLoginValidationSchema),
  });

  const emailLoginMutation = useMutation({
    mutationFn: ({ payload }: EmailLoginMutationVariables) =>
      loginService.emailLogin(payload),
    onSuccess: () => handleEmailLoginSuccess(),
    onError: (e) => handleEmailLoginFailure(e),
  });

  function handleEmailLoginSuccess() {
    replace("/");
  }

  function handleEmailLoginFailure(error: unknown) {
    toast({
      title: "Error",
      description: "Could not login with those credentials.",
      variant: "destructive",
    });
  }

  function onSubmitForm({ email, password }: EmailLoginForm) {
    emailLoginMutation.mutate({ payload: { email, password } });
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmitForm,
    isLoading: emailLoginMutation.isPending,
  };
}
