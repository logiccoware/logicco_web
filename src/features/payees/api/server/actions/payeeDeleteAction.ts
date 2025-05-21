"use server";

import { getApiPath } from "@/lib/api/helpers/getApiPath";
import { getAuthHeader, getBaseHeaders } from "@/lib/api/helpers/headers";
import { IFormActionState } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { getAccessTokenOrFail } from "@/lib/api/server/helpers/getAccessToken";
import {
  formActionSuccess,
  formActionValidationError,
} from "@/lib/api/helpers/formAction";

export default async function payeeDeleteAction(
  prevState: unknown,
  formData: FormData
): Promise<IFormActionState> {
  const accessToken = await getAccessTokenOrFail();

  const payeeId = formData.get("entityId") as string;

  const res = await fetch(getApiPath(`/payees/${payeeId}`), {
    method: "DELETE",
    headers: {
      ...getBaseHeaders(),
      ...getAuthHeader(accessToken),
    },
  });

  if (!res.ok) {
    const resBody: unknown = await res.json();
    if (res.status === 400) {
      return formActionValidationError(resBody);
    }
    throw new Error("An unknown error occurred");
  }

  revalidatePath("app/payees");

  return formActionSuccess();
}
