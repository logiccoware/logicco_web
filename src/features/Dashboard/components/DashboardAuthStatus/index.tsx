'use client';

import { useAuthUser } from "@/features/User/hooks/useAuthUser";

export function DashboardAuthStatus() {
    const { user } = useAuthUser();
    
    return (
        <div>
            {user ? <div>{user.email}</div>: <div>Not logged in</div>}
        </div>
    )
}