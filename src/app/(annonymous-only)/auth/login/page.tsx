import { EmailLoginFeature } from "@/features/Login/components/EmailLogin/EmailLoginFeature";

export default async function LoginPage() {
  return (
    <main className="m-4">
      <div className="w-full">
        <EmailLoginFeature />
      </div>
    </main>
  );
}
