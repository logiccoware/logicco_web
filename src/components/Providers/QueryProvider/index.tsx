"use client";

import { queryClient } from "@/domain/query/services";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export function QueryProvider({children}: PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}