import { Label } from "@/components/ui/label";
import { FormFieldProps } from "@/components/Form/FormField/types";

export function FormField({
  label,
  name,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={className}>
      <Label className="my-2" htmlFor={name}>
        {label}
      </Label>
      {children}
    </div>
  );
}
