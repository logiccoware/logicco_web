import { payeeService } from "@/domain/payee/services";
import { SESSION_COOKIE_NAME } from "@/domain/user/constants";
import { PayeeList } from "@/features/Payee/components/PayeeList";
import { cookies } from "next/headers";

function test() {
  console.log("test");
}

export default async function PayeesPage() {
  const payees = await payeeService.getPayeesFromSession(
    cookies().get(SESSION_COOKIE_NAME)?.value
  );

  test();

  return (
    <div>
      <PayeeList payees={payees} />
    </div>
  );
}
