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
  console.log("token", "midddle ware -------------------");

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/admin", request.nextUrl));
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
    "/login",
    "/signup",
    "/verifyemail",
    "/resetpassword",
  ],
};
