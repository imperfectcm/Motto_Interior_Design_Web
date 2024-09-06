import { authService, pb } from "@/services/AuthService";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";


export async function POST(request: NextRequest) {

    try {
        const { email, password } = await request.json();

        const result = await authService.authenticate(email, password);
        cookies().set("pb_auth", pb.authStore.exportToCookie());

        console.log("cookies: ", cookies());

        await authService.isAdminAuthenticated(cookies());

        return NextResponse.json(result);

    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: error.message || error.toString() }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
    }

}