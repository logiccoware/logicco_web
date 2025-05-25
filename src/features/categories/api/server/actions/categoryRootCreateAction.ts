"use server";

import { getApiPath } from "@/lib/api/helpers/getApiPath";
import { getAuthHeader, getBaseHeaders } from "@/lib/api/helpers/headers";
import { IFormActionState } from "@/lib/types";
import { revalidatePath } from "next/cache";
import {
  formActionSuccess,
  formActionValidationError,
} from "@/lib/api/helpers/formAction";
import { getAccessTokenOrFail } from "@/lib/api/server/helpers/getAccessToken";

export default async function categoryRootCreateAction(
  prevState: unknown,
  formData: FormData
): Promise<IFormActionState> {
  const accessToken = await getAccessTokenOrFail();

  const fields = {
    name: formData.get("name"),
  };

  const res = await fetch(getApiPath("/categories/rootCategory"), {
    method: "POST",
    headers: {
      ...getBaseHeaders(),
      ...getAuthHeader(accessToken),
    },
    body: JSON.stringify(fields),
  });

  if (!res.ok) {
    const resBody: unknown = await res.json();
    return formActionValidationError(resBody);
  }

  revalidatePath("app/categories");

  return formActionSuccess();
}
