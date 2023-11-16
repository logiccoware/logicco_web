import { ApiService } from "@/domain/api/services/ApiService";
import { assertDecode } from "@/lib/helpers/asserDecode";
import { AuthUserModel, AuthUserSessionError, AuthUser } from "../models";
import { FirebaseAuthService } from "@/domain/firebase/services/FirebaseAuthService";
import { signOut } from "firebase/auth";
import * as E from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import { LOGOUT_ROUTE } from "@/domain/routes";

export class UserService {
  constructor(
    private readonly apiService: ApiService,
    private readonly firebaseAuthService: FirebaseAuthService,
    private readonly apiNextService: ApiService
  ) {}

  /**
   * USE IN SERVER ONLY: Retrieves the authenticated user's session information from the server.
   * @param cookieValue Optional cookie value to use for the request.
   * @returns A Promise that resolves to an AuthUser object if the user is authenticated, or undefined if not.
   */
  async getAuthSession(cookieValue?: string): Promise<AuthUser | undefined> {
    const userSession = await this._getUserFromSession(cookieValue);

    if (
      E.isLeft(userSession) &&
      userSession.left.errorType === "FIREBASE_LOGOUT_REQUIRED"
    ) {
      redirect(LOGOUT_ROUTE);
    }

    return E.isRight(userSession) ? userSession.right : undefined;
  }

  async logout(): Promise<void> {
    await this._firebaseLogout();
    await this._logoutServerSide();
  }

  private async _firebaseLogout(): Promise<void> {
    await signOut(this.firebaseAuthService.getAuth());
  }

  private async _logoutServerSide(): Promise<void> {
    const res = await this.apiNextService.request({
      endpoint: "/logout/api",
      method: "POST",
    });

    if (!res.ok) {
      throw new Error("Error logging out");
    }
  }

  private async _getUserFromSession(
    sessionCookieValue?: string
  ): Promise<E.Either<AuthUserSessionError, AuthUser>> {
    if (!sessionCookieValue) {
      return E.left({ errorType: "SESSION_COOKIE_UNDEFINED" });
    }

    const res = await this.apiService.withSessionCookie(
      {
        endpoint: "/users/verify-session",
        method: "GET",
      },
      sessionCookieValue
    );

    if (!res.ok && res.status === 401) {
      return E.left({ errorType: "FIREBASE_LOGOUT_REQUIRED" });
    }

    return E.right(
      assertDecode(
        AuthUserModel.decode(await res.json()),
        "Failed to decode AuthUserModel"
      )
    );
  }
}
