"use client";

import { createActorContext } from "@xstate/react";
import { PropsWithChildren } from "react";
import { categorySelectMachine } from "@/features/categories/store/stateMachines/categorySelectMachine";

export const CategorySelectMachineContext = createActorContext(
  categorySelectMachine
);

export function CategorySelectMachineProvider({ children }: PropsWithChildren) {
  return (
    <CategorySelectMachineContext.Provider>
      {children}
    </CategorySelectMachineContext.Provider>
  );
}
