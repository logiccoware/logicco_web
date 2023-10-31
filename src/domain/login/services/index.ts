import { LoginService } from "@/domain/login/services/LoginService";
import { firebaseAuthService } from "@/domain/firebase/services";

export const loginService = new LoginService(
  firebaseAuthService
);
