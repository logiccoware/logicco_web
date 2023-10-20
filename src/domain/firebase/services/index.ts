import { FirebaseAuthService } from "@/domain/firebase/services/FirebaseAuthService";
import { FIREBASE_CONFIG } from "@/domain/firebase/config";

export const firebaseAuthService = new FirebaseAuthService(FIREBASE_CONFIG);
