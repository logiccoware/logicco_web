import { FormEvent, PropsWithChildren } from "react";

export interface FormDialogProps extends PropsWithChildren {
    type: "create" | "update";
    handleDelete: () => void;
    handleCloseDialog?: () => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  }
  