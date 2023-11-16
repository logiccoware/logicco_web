"use client";
import { Suspense } from "react";
import PayeeSelectDropdown from "../PayeeSelectDropdown";

export default function PayeeSelect() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PayeeSelectDropdown />
    </Suspense>
  );
}
