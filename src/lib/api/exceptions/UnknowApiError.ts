export class UnknowApiError extends Error {
  constructor(message?: string) {
    super(message || "An unknown error occurred");
    this.name = "UnknownError";
  }
}
