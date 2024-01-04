import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const publicRoutes = ["/auth/login", "/auth/register"];
  const path = request.nextUrl.pathname;

  if (publicRoutes.some(item => path.startsWith(item))) {
    return;
  }

  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl.origin));
  }
  return;
}

export const config = { matcher: ["/((?!api|static|.*\\..*|_next).*)"] };
