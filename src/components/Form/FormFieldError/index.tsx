import { WithClassName } from "@/lib/types";
import classNames from "classnames";
import { Text } from "@/components/Typography/Text";
import { AlertCircle } from "lucide-react";

interface FormFieldErrorProps extends WithClassName {
  message?: string;
  hasIcon?: boolean;
}

export function FormFieldError({
  className,
  message,
  hasIcon,
}: FormFieldErrorProps) {
  if (!message) {
    return null;
  }
  return (
    <div
      className={classNames("flex items-center gap-2 text-red-500", className)}
    >
      {hasIcon ? <AlertCircle size={18} /> : null}
      <Text variant="small">{message}</Text>
    </div>
  );
}
