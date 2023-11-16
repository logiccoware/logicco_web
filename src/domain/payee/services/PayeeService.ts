import { ApiService } from "@/domain/api/services/ApiService";
import { CreatePayeePayload, UpdatePayeePayload } from "@/domain/payee/types";
import { assertDecode } from "@/lib/helpers/asserDecode";
import {
  PayeeListResponseModel,
  PayeeListResponse,
} from "@/domain/payee/models";

function wait(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export class PayeeService {
  constructor(private readonly apiService: ApiService) {}

  async getPayeesFromSession(
    sessionCookieValue?: string
  ): Promise<PayeeListResponse> {
    const res = await this.apiService.withSessionCookie(
      {
        method: "GET",
        endpoint: "/payee",
      },
      sessionCookieValue ?? ""
    );

    if (!res.ok) {
      throw new Error("Error getting payees");
    }

    return assertDecode(
      PayeeListResponseModel.decode(await res.json()),
      "Failed to decode PayeeListResponseModel"
    );
  }

  async getPayees(): Promise<PayeeListResponse> {
    // await wait(2000);
    const res = await this.apiService.authenticated({
      method: "GET",
      endpoint: "/payee",
    });

    if (!res.ok) {
      console.log(res);
      throw new Error("Error getting payees");
    }

    return assertDecode(
      PayeeListResponseModel.decode(await res.json()),
      "Failed to decode PayeeListResponseModel"
    );
  }

  createPayee(payload: CreatePayeePayload) {
    return this.apiService.authenticated({
      method: "POST",
      endpoint: "/payee",
      body: payload,
    });
  }

  updatePayee(payeeId: string, payload: UpdatePayeePayload) {
    return this.apiService.authenticated({
      method: "PUT",
      endpoint: `/payee/${payeeId}`,
      body: payload,
    });
  }

  deletePayee(payeeId: string) {
    return this.apiService.authenticated({
      method: "DELETE",
      endpoint: `/payee/${payeeId}`,
    });
  }
}
