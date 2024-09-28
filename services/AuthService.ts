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

            if (!result?.token) return ({ message: "Invalid email or password." })

            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async isAdminAuthenticated(cookieStore: ReadonlyRequestCookies) {
        const cookie = cookieStore.get("pb_auth");
        if (!cookie) {
            return false;
        }
        pb.authStore.loadFromCookie(cookie?.value || "");
        console.log(pb.authStore);
        console.log("is admin? ", pb.authStore.isAdmin);
        console.log("is valid? ", pb.authStore.isValid);
        console.log("token? ", pb.authStore.token);
        console.log("id? ", pb.authStore.model?.id);

        return pb.authStore.isAdmin || false
    }

    async getUser(cookieStore: ReadonlyRequestCookies) {
        const cookie = cookieStore.get("pb_auth");
        if (!cookie) {
            return false;
        }
        pb.authStore.loadFromCookie(cookie?.value || "");
        console.log(pb.authStore);
        return pb.authStore.model;
    }

}

export const authService = new AuthService();