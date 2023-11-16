import { Text } from "@/components/Typography/Text";
import { PayeeDialog } from "@/features/Payee/components/PayeeDialog";


export default async function PayeesPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="m-4">
      <div className="flex justify-between items-center">
        <Text variant="large">Payees</Text>
        <PayeeDialog />
      </div>
      {children}
    </main>
  );
}
