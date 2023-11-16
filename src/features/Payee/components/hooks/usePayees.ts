import type { PayeeListResponse, PayeeResponse } from "@/domain/payee/models";
import { payeeService } from "@/domain/payee/services";
import { useSuspenseQuery } from "@tanstack/react-query";

export function usePayees() {
  const query = useSuspenseQuery<PayeeListResponse>({
    queryKey: ["api/payees"],
    queryFn: () => payeeService.getPayees(),
  });
  return [query.data, query] as const;
}
