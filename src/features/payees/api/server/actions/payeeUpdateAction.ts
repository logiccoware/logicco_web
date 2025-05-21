"use server";

import { getApiPath } from "@/lib/api/helpers/getApiPath";
import { getAuthHeader, getBaseHeaders } from "@/lib/api/helpers/headers";
import { auth } from "@clerk/nextjs/server";
import { IFormActionState } from "@/lib/types";
import { revalidatePath } from "next/cache";
import {
  formActionSuccess,
  formActionValidationError,
} from "@/lib/api/helpers/formAction";
import { UnknowApiError } from "@/lib/api/exceptions/UnknowApiError";

export default async function payeeUpdateAction(
  prevState: unknown,
  formData: FormData
): Promise<IFormActionState> {
  const { getToken } = await auth();
  const accessToken = await getToken();

  if (!accessToken) {
    throw new Error("No access token found");
  }

  const payeeId = formData.get("payeeId") as string;

  const payload = {
    name: formData.get("name"),
  };

  const res = await fetch(getApiPath(`/payees/${payeeId}`), {
    method: "PUT",
    headers: {
      ...getBaseHeaders(),
      ...getAuthHeader(accessToken),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const resBody: unknown = await res.json();
    if (res.status === 400) {
      return formActionValidationError(resBody);
    }
    throw new UnknowApiError();
  }

  revalidatePath("app/payees");

  return formActionSuccess();
}
