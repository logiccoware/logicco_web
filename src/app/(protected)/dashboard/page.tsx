import { payeeService } from "@/domain/payee/services";
import { SESSION_COOKIE_NAME } from "@/domain/user/constants";
import { DashboardAuthStatus } from "@/features/Dashboard/components/DashboardAuthStatus";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

const PayeeSelect = dynamic(
  () => import("@/features/Payee/components/PayeeSelect"),
  { ssr: false }
);

export default function DashboardPage() {
  // const payees = await payeeService.getPayeesFromSession(
  //   cookies().get(SESSION_COOKIE_NAME)?.value
  // );

  return (
    <main className="m-4">
      <DashboardAuthStatus />
      <div className="mt-4">
        <PayeeSelect />
      </div>
      {/* <div className="mt-4">
        {payees.map((payee) => (
          <div className="mt-2" key={payee.id}>{payee.name}</div>
        ))}
      </div> */}
    </main>
  );
}
