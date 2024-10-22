
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authService } from "./services/AuthService";

const protectedRoutes = ["/admin", "/admin/create-project", "/admin/project"];

export default async function middleware(req: NextRequest) {
  const isAdmin = await authService.isAdminAuthenticated(cookies());
  if (!isAdmin && protectedRoutes.includes(req.nextUrl.pathname)) {
    const loginURL = new URL("login", req.nextUrl.origin);
    return NextResponse.redirect(loginURL.toString());
  }
}
