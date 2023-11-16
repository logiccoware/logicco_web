import { payeeService } from "@/domain/payee/services";
import { PAYEE_FORM_VALIDATION_SCHEMA } from "@/features/Payee/data";
import { PayeeFormValidation } from "@/features/Payee/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type {
  UsePayeeFormProps,
  CreatePayeeMutationVariables,
  UpdatePayeeMutationVariables,
  DeletePayeeMutationVariables,
} from "@/features/Payee/components/PayeeForm/types";
import { useRouter } from "next/navigation";

export function usePayeeForm({ payee, handleSuccess }: UsePayeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PayeeFormValidation>({
    resolver: yupResolver(PAYEE_FORM_VALIDATION_SCHEMA),
    defaultValues: payee,
  });

  const createPayeeMutation = useMutation({
    mutationFn: ({ payload }: CreatePayeeMutationVariables) =>
      payeeService.createPayee(payload),
    onSuccess: () => handleSuccess(),
    onError: () => {},
  });

  const updatePayeeMutation = useMutation({
    mutationFn: ({ payload, payeeId }: UpdatePayeeMutationVariables) =>
      payeeService.updatePayee(payeeId, payload),
    onSuccess: () => handleSuccess(),
    onError: () => {},
  });

  const deletePayeeMutation = useMutation({
    mutationFn: ({ payeeId }: DeletePayeeMutationVariables) =>
      payeeService.deletePayee(payeeId),
    onSuccess: () => handleSuccess(),
    onError: () => {},
  });

  function handleDeletePayee() {
    if (payee) {
      deletePayeeMutation.mutate({ payeeId: payee.id });
    }
  }

  function onSubmitForm({ name }: PayeeFormValidation) {
    if (payee) {
      updatePayeeMutation.mutate({ payeeId: payee.id, payload: { name } });
    } else {
      createPayeeMutation.mutate({ payload: { name } });
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmitForm,
    handleDeletePayee,
  };
}
