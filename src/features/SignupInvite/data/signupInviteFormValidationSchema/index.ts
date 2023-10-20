import * as yup from "yup";
import { stringResources } from "@/stringResources";

const { validation } = stringResources.signupInvitePage.form;

export const signUpInviteValidationSchema = yup
  .object({
    displayName: yup
      .string()
      .required(validation.displayName.required)
      .max(250, validation.displayName.max),
    password: yup
      .string()
      .required(validation.password.required)
      .min(7, validation.password.min),
  })
