import { apiService } from "@/domain/api/services";
import { SignupInviteService } from "./SignupInviteService";

export const signUpInviteService = new SignupInviteService(apiService);