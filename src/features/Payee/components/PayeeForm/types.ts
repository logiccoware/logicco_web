import { PayeeResponse } from "@/domain/payee/models";
import { CreatePayeePayload, UpdatePayeePayload } from "@/domain/payee/types";

export interface CreatePayeeMutationVariables {
  payload: CreatePayeePayload;
}

export interface UpdatePayeeMutationVariables {
  payeeId: string;
  payload: UpdatePayeePayload;
}

export interface DeletePayeeMutationVariables {
  payeeId: string;
}

export interface UsePayeeFormProps {
  payee?: PayeeResponse;
  handleSuccess: () => void;
}
