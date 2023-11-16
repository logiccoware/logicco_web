"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PayeeResponse } from "@/domain/payee/models";
import { usePayees } from "@/features/Payee/components/hooks/usePayees";

interface PayeeSelectDropdownProps {
  selectedPayee?: PayeeResponse;
}

export default function PayeeSelectDropdown({
  selectedPayee,
}: PayeeSelectDropdownProps) {
  const [payees] = usePayees();
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a payee" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {payees?.map((payee) => (
            <SelectItem key={payee.id} value={payee.id}>
              {payee.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
