import { object, string } from "yup";
import { PayeeFormValidation } from "@/features/Payee/types";

export const PAYEE_FORM_DEFAULT_VALUES: PayeeFormValidation = {
  name: "",
};

export const PAYEE_FORM_VALIDATION_SCHEMA = object({
  name: string().required("Name is required"),
});
