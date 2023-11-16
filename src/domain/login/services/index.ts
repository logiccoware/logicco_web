import { LoginService } from "@/domain/login/services/LoginService";
import { firebaseAuthService } from "@/domain/firebase/services";
import { apiNextService } from "@/domain/api/services";

export const loginService = new LoginService(
  firebaseAuthService,
  apiNextService,
);
