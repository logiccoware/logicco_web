import { ListMenuItem } from "@/components/ListMenuItem";
import { PayeeListResponse } from "@/domain/payee/models";
import { PayeeDialog } from "@/features/Payee/components/PayeeDialog";

type PayeeListProps = {
  payees: PayeeListResponse;
};

export function PayeeList({ payees }: PayeeListProps) {
  return (
    <div className="mt-8">
      {payees.map((payee) => (
        <ListMenuItem
          leading={payee.name}
          trailing={<PayeeDialog payee={payee} />}
          key={payee.id}
        />
      ))}
    </div>
  );
}
