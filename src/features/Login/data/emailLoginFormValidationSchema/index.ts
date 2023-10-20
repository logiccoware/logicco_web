import * as yup from "yup";
import { stringResources } from "@/stringResources";

const { validation } = stringResources.loginPage;

export const emailLoginValidationSchema = yup.object({
  email: yup
    .string()
    .email(validation.email.invalid)
    .required(validation.email.required),
  password: yup
    .string()
    .required(validation.password.required)
});
