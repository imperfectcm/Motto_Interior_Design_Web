import PocketBase from 'pocketbase';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const pb = new PocketBase(process.env.POCKETBASE_URL);

class AuthService {

    constructor() { } 

    // login
    async authenticate(email: string, password: string) {
        try {
            const result = await pb.admins.authWithPassword(email, password);
            console.log("admin result: ", result)
            if (!result?.token) { throw new Error("Invalid email or password.") }
            return { data: result, success: true };
        } catch (error: any) {
            return { error: error.message };
        }
    }

    // check admin login
    async isAdminAuthenticated(cookieStore: ReadonlyRequestCookies) {
        const cookie = cookieStore.get("pb_auth");
        if (!cookie) { return false };
        pb.authStore.loadFromCookie(cookie?.value || "");
        return pb.authStore.isAdmin || false
    }

    // get user info from cookie
    async getUser(cookieStore: ReadonlyRequestCookies) {
        const cookie = cookieStore.get("pb_auth");
        if (!cookie) { return false };
        pb.authStore.loadFromCookie(cookie?.value || "");
        return pb.authStore;
    }

    async signout() {
        try {
            pb.authStore.clear();
            return { data: "Successed to sign out.", success: true };
        } catch (error: any) {
            return { error: error.message };
        }
    }

}

export const authService = new AuthService();