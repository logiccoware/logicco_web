import { apiNextService, apiService } from "@/domain/api/services";
import { firebaseAuthService } from "@/domain/firebase/services";
import { UserService } from "@/domain/user/services/UserService";

export const userService = new UserService(
  apiService,
  firebaseAuthService,
  apiNextService
);