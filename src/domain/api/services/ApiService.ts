import { getHeaderSessionCookie } from "@/domain/api/helpers/getHeaderSessionCookie";
import { ApiFetchOptions } from "@/domain/api/types";
import { firebaseAuthService } from "@/domain/firebase/services";
import { DEFAULT_HEADERS } from "@/domain/api/constants";

export class ApiService {
  constructor(private readonly baseUrl: string) {}

  request(options: ApiFetchOptions) {
    return this.apiFetch(options);
  }

  private apiFetch(options: ApiFetchOptions) {
    const { endpoint, method, headers, body } = options;
    return fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      method,
      headers: headers ? { ...DEFAULT_HEADERS, ...headers } : DEFAULT_HEADERS,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  withSessionCookie(options: ApiFetchOptions, sessionCookieValue: string) {
    return this.apiFetch({
      ...options,
      headers: {
        Cookie: getHeaderSessionCookie(sessionCookieValue ?? ""),
      },
      cache: "no-store",
    });
  }

  async withFirebaseIdToken(options: ApiFetchOptions) {
    return this.apiFetch({
      ...options,
      headers: {
        Authorization: `Bearer ${await firebaseAuthService.getIdToken()}`,
      },
    });
  }
}
