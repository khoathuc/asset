import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { ADMIN_ROLE } from "./app/api/auth/[...nextauth]/options";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login");

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(new URL(`/login`, req.url));
    }

    if (token.role != ADMIN_ROLE) {
      const pathname = req.nextUrl.pathname;
      if (pathname.startsWith("settings") || pathname.startsWith("users")) {
        return NextResponse.redirect(new URL("/denied", req.url));
      }
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    "/",
    "/login",
    "/users/:path*",
    "/settings/:path*",
    "/asset/:id*",
    "/assets/:id",
  ],
};
