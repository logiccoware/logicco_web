import { z } from "zod";
import { PayeeBaseSchema } from "@/features/payees/schema";
import { getApiPath } from "@/lib/api/helpers/getApiPath";
import { getAuthHeader, getBaseHeaders } from "@/lib/api/helpers/headers";

export type TGetPayeesList = z.infer<typeof GetPayeesSchema>;
export const GetPayeesSchema = z.object({
  payees: z.array(PayeeBaseSchema),
});

export async function getPayeesList(
  accessToken: string
): Promise<TGetPayeesList> {
  const res = await fetch(getApiPath("/payees"), {
    method: "GET",
    headers: {
      ...getBaseHeaders(),
      ...getAuthHeader(accessToken),
    },
  });

  if (!res.ok) {
    throw new Error(`Error fetching payees: ${res.status} ${res.statusText}`);
  }

  return GetPayeesSchema.parse(await res.json());
}
