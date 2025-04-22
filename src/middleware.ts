import { NextRequest, NextResponse } from "next/server";
import { GetSessionServer } from "./lib/auth_confg";

const isPlublicRoute = ['login', 'register', 'termos'];

export async function middleware(req: NextRequest) {
  const session = await GetSessionServer();

  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }
  if(pathname === "/login") {
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    if (isPlublicRoute.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: "/((?!_next|favicon.ico|public|.*\\..*).*)"
};
