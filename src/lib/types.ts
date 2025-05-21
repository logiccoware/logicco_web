export interface IFormActionState {
  success: boolean;
  error: IFormActionError | null;
}

export interface IFormActionError {
  type: string;
  errors: Record<string, string>;
}
