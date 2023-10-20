import { Either, isLeft } from "fp-ts/lib/Either";
import { Errors } from "io-ts";
import { formatValidationErrors } from "io-ts-reporters";

export class DecodeError extends Error {
  constructor(private errors: string[], message: string) {
    super(`${message}: \n${errors.join("\n")}`);
  }
}

export function assertDecode<T>(
  decodedResult: Either<Errors, T>,
  failureMessage: string
): T {
  if (isLeft(decodedResult)) {
    throw new DecodeError(
      formatValidationErrors(decodedResult.left, { truncateLongTypes: false }),
      failureMessage
    );
  }

  return decodedResult.right;
}
