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
  errorObject: Record<string, string[]>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawFormData?: any
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
      inputs: rawFormData,
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
