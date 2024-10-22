import { loginFailedToast } from "@/components/toastify/toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const adminLogin = async (email: string, password: string, router: AppRouterInstance) => {
    try {
        const res = await fetch('/api/admin-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        if (!res.ok) {
            loginFailedToast();
            return "Failed to login";
        }
        const data = await res.json();
        if (data?.token) {
            router.push("/admin")
        } else {
            loginFailedToast();
            return "Failed to login";
        }
    } catch (error: any) {
        loginFailedToast();
        throw new Error(error.message);
    }
}