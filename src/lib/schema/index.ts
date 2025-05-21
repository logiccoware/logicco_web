import { z } from "zod";

export type TValidationError = z.infer<typeof ValidationErrorSchema>;
export const ValidationErrorSchema = z.object({
  type: z.literal("VALIDATION_ERROR"),
  errors: z.record(z.string()),
});
