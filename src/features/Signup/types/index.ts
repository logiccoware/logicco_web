import { SignupInvitePayload } from "@/domain/signup/types";

export interface SignupInviteForm {
  displayName: string;
  password: string;
}

export interface SignupInviteMutationVariables {
  payload: SignupInvitePayload;
}