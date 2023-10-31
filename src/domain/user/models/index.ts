import * as io from "io-ts";

export const AuthUserModel = io.type({
  email: io.string,
  displayName: io.string,
});

export type AuthUser = io.TypeOf<
  typeof AuthUserModel
>;
