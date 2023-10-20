import { ApiService } from "@/domain/api/services/ApiService";
import { SignupInvitePayload } from "@/domain/signup/types";

export class SignupInviteService {
  constructor(private readonly apiService: ApiService) {}

  getSignupInviteData(code: string): Promise<Response> {
    return this.apiService.request({
      method: "GET",
      endpoint: `/signup-invite/${code}`,
      cache: 'no-cache',
    });
  }

  signupInvite(payload: SignupInvitePayload): Promise<Response> {
    return this.apiService.request({
      method: "POST",
      endpoint: "/signup-invite",
      body: payload,
    });
  }
}
