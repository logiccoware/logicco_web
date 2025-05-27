import { IFormActionState } from "@/lib/types";

export function formActionGenericError(): IFormActionState {
  return {
    success: false,
    error: {
      type: "GENERIC_ERROR",
      errors: {
        unknown: "An unknown error occurred",
      },
    },
  };
}

export function formActionValidationError(
  errorObject: Record<string, string[]>
): IFormActionState {
  const transformed: Record<string, string> = {};

  for (const key in errorObject) {
    if (errorObject.hasOwnProperty(key) && errorObject[key].length > 0) {
      transformed[key] = errorObject[key][0];
    }
  }

  return {
    error: {
      type: "VALIDATION_ERROR",
      errors: transformed,
    },
    success: false,
  };
}

export function formActionSuccess(): IFormActionState {
  return {
    success: true,
    error: null,
  };
}
