import { AppHeader } from "@/components/layouts/PublicLayout/AppHeader";

export default function PublicLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <main>
        <AppHeader />
        {children}
      </main>
    );
  }
  