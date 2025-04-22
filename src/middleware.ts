import { NextRequest, NextResponse } from "next/server";
import { APP_ROUTES } from "./constants/app-routes";
import { createRouteMatch } from "./lib/route";

export async function middleware(req: NextRequest) {
  const cookiesAll = req.cookies.getAll();
  const filtro = cookiesAll.filter((cookie) =>
    cookie.name.includes("next-auth.session-token")
  );
  const session = filtro[0]?.value;

  const { pathname } = req.nextUrl;

  const { isPlublicRoute, isPrivateRoute, isBlockRoute } = createRouteMatch(
    APP_ROUTES,
    req
  );

  
}

export const config = {
  matcher: "/((?!_next|favicon.ico|public|.*\\..*).*)"
};
