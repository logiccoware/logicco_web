import * as io from "io-ts";

export const EmailSessionLoginResponseModel = io.type({
  user: io.type({
    isEmailVerified: io.boolean,
  }),
  cookieOptions: io.type({
    name: io.string,
    value: io.string,
    maxAge: io.number,
    httpOnly: io.boolean,
    secure: io.boolean,
  }),
});

export type EmailSessionLoginResponse = io.TypeOf<
  typeof EmailSessionLoginResponseModel
>;
