import { ValidationErrorSchema } from "@/lib/schema";
import { IFormActionState } from "@/lib/types";

export function formActionValidationError(resBody: unknown): IFormActionState {
  const validationError = ValidationErrorSchema.safeParse(resBody);

  if (validationError.success) {
    return {
      error: validationError.data,
      success: false,
    };
  }

  return {
    success: false,
    error: {
      type: "VALIDATION_ERROR",
      errors: {
        unknown: "An unknown error occurred",
      },
    },
  };
}

export function formActionSuccess(): IFormActionState {
  return {
    success: true,
    error: null,
  };
}
