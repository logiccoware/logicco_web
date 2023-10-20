import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PropsWithChildren } from "react";
import { stringResources } from "@/stringResources";

export function SignupInviteCard({ children }: PropsWithChildren) {
  return (
    <Card>
      <CardHeader>{stringResources.signupInvitePage.form.title}</CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
