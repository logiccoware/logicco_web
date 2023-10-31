import { FirebaseAuthService } from "@/domain/firebase/services/FirebaseAuthService";
import { signInWithEmailAndPassword } from "firebase/auth";
import { EmailLoginPayload } from "@/domain/login/types";

export class LoginService {
  constructor(
    private readonly firebaseService: FirebaseAuthService
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

      console.log(idToken);

    } catch (error) {
      return Promise.reject(error);
    }
  }
}
