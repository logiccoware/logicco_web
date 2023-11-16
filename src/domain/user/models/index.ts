import * as io from "io-ts";

export const AuthUserModel = io.type({
  id: io.string,
  email: io.string,
  isEmailVerified: io.boolean,
});

const AuthUserSessionErrorTypes = io.union([
  io.literal("SESSION_COOKIE_UNDEFINED"),
  io.literal("FIREBASE_LOGOUT_REQUIRED"),
]);

const AuthUserSessionErrorModel = io.type({
  errorType: AuthUserSessionErrorTypes,
});

export type AuthUser = io.TypeOf<typeof AuthUserModel>;

export type AuthUserSessionError = io.TypeOf<typeof AuthUserSessionErrorModel>;
