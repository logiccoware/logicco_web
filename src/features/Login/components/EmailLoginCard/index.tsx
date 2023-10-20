import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PropsWithChildren } from "react";
import { stringResources } from "@/stringResources";

export function EmailLoginCard({ children }: PropsWithChildren) {
  return (
    <Card>
      <CardHeader>{stringResources.loginPage.title}</CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
