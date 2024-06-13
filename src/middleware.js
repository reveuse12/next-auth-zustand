import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = [
    "/login",
    "/signup",
    "/",
    "/verifyemail",
    "/resetpassword",
  ].includes(path);

  const token = request.cookies.get("token")?.value || "";

  if ((path === "/dashboard" || path === "/admin") && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/admin",
    "/dashboard",
    "/login",
    "/signup",
    "/verifyemail",
    "/resetpassword",
  ],
};
