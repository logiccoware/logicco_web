import * as io from "io-ts";

export const PayeeResponseModel = io.type({
  id: io.string,
  name: io.string,
  createdAt: io.string,
  updatedAt: io.string,
});

export const PayeeListResponseModel = io.array(PayeeResponseModel);

export type PayeeResponse = io.TypeOf<typeof PayeeResponseModel>;
export type PayeeListResponse = io.TypeOf<typeof PayeeListResponseModel>;