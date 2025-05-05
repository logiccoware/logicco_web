// import { ProtectedLayout } from "@/components/layouts/ProtectedLayout";
import { SignInRequired } from "@/features/auth/components/SignInRequired";
import { auth0 } from "@/lib/auth/services";
import { ComingSoonSection } from "@/components/ui/ComingSoonSection";

export interface IProps {
  children: React.ReactNode;
}

export default async function Layout({}: IProps) {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <main>
        <SignInRequired />
      </main>
    );
  }

  return (
    <main>
      <ComingSoonSection />
    </main>
  );
}
