import { FirebaseOptions, initializeApp } from "firebase/app";
import { getApps, getApp } from "firebase/app";
import { User, getAuth } from "firebase/auth";

export class FirebaseAuthService {
  constructor(private readonly config: FirebaseOptions) {}

  getAuth() {
    const app = getApps().length > 0 ? getApp() : initializeApp(this.config);
    const firebaseAuth = getAuth(app);
    return firebaseAuth;
  }

  async getIdToken() {
    const user = await this.getCurrentUser();

    if (!user) {
      return "";
    }

    const idToken = await user.getIdToken();

    return idToken;
  }

  private getCurrentUser(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const unsubscribe = this.getAuth().onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  }
}
