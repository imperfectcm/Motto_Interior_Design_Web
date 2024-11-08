import { authService, pb } from "@/services/AuthService";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        const result = await authService.authenticate(email, password);
        if (result.success) {
            cookies().set("pb_auth", pb.authStore.exportToCookie());
            return NextResponse.json(result.data);
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.error || error.toString() }, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const result = await authService.signout();
        if (result.success) {
            cookies().delete("pb_auth");
            return NextResponse.json(result.data);
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.error || error.toString() }, { status: 500 })
    }
}