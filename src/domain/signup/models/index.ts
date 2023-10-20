import * as io from "io-ts";

export const SignupInviteResponseModel = io.type({
  code: io.string,
  email: io.string,
});

export type SignupInviteResponse = io.TypeOf<typeof SignupInviteResponseModel>;
