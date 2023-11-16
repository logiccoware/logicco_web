import { FirebaseAuthService } from "@/domain/firebase/services/FirebaseAuthService";
import { signInWithEmailAndPassword } from "firebase/auth";
import { EmailLoginPayload } from "@/domain/login/types";
import { ApiService } from "@/domain/api/services/ApiService";

export class LoginService {
  constructor(
    private readonly firebaseService: FirebaseAuthService,
    private readonly apiNextService: ApiService,
  ) {}

  async emailLogin({ email, password }: EmailLoginPayload): Promise<void> {
    try {
      const firebaseAuth = this.firebaseService.getAuth();

      const firebaseLoginRes = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      const idToken = await firebaseLoginRes.user.getIdToken();

      const res = await this.apiNextService.request({
        endpoint: "/auth/login/api",
        method: "POST",
        body: { idToken },
      });

      const resData = await res.json();

      if (!res.ok) {
        return Promise.reject(resData);
      }

    } catch (error) {
      return Promise.reject(error);
    }
  }
}
