import { loginFailedToast, logoutFailedToast } from "@/components/toastify/toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
export const dynamic = "force-dynamic";

export const adminLogin = async (email: string, password: string, router: AppRouterInstance) => {
    try {
        const res = await fetch('/api/auth', {
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

export const adminLogOut = async () => {
    try {
        const res = await fetch('/api/auth', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            logoutFailedToast();
            return "Failed to log out";
        }
        return window.location.href = "/";
    } catch (error: any) {
        loginFailedToast();
        throw new Error(error.message);
    }
}