import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useMutation } from "@tanstack/react-query";
import { emailLoginValidationSchema } from "@/features/Login/data/emailLoginFormValidationSchema";
import { EmailLoginForm } from "@/features/Login/types";

export function useEmailLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailLoginForm>({
    resolver: yupResolver(emailLoginValidationSchema),
  });

//   const emailLoginMutation = useMutation({
//     mutationFn: () => { return {  } }
//     onSuccess: () => handleEmailLoginSuccess(),
//     onError: (e) => handleEmailLoginFailure(e),
//   });

  function handleEmailLoginSuccess() {
    console.log("Success");
  }

  function handleEmailLoginFailure(error: unknown) {
    console.log(error);
  }

  function onSubmitForm(data: EmailLoginForm) {
   console.log(data);
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmitForm,
    isLoading: false,
  };
}
