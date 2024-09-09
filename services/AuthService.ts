import PocketBase from 'pocketbase';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const POCKET_BASE_URL = "http://127.0.0.1:8090";
export const pb = new PocketBase(POCKET_BASE_URL);

class AuthService {

    constructor() { }

    async authenticate(username: string = "motto.intdesign@gmail.com", password: string = "Otis63730015") {
        try {
            // const email = "motto.intdesign@gmail.com";
            // const password = "Otis63730015";
            const result = await pb.admins.authWithPassword(username, password);

            if (!result?.token) { throw new Error("Invalid email or password.") }

            return result;
        } catch (error) {
            throw new Error("Invalid email or password.")
        }
    }

    async isAdminAuthenticated(cookieStore: ReadonlyRequestCookies) {
        const cookie = cookieStore.get("pb_auth");
        if (!cookie) {
            return false;
        }
        pb.authStore.loadFromCookie(cookie?.value || "");

        return pb.authStore.isAdmin || false
    }

    async getUser(cookieStore: ReadonlyRequestCookies) {
        const cookie = cookieStore.get("pb_auth");
        if (!cookie) {
            return false;
        }
        pb.authStore.loadFromCookie(cookie?.value || "");
        return pb.authStore;
    }

}

export const authService = new AuthService();