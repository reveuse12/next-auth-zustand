import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = [
    "/login",
    "/signup",
    "/",
    "/verifyemail",
    "/resetpassword",
  ].includes(path);

  const token = request.cookies.get("token")?.value || "";
  // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  // if (!decodedToken)
  //   return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  // console.log(
  //   token ? decodedToken : "no token",
  //   "midddle ware -------------------"
  // );

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
    "/dashboard",
    "/login",
    "/signup",
    "/verifyemail",
    "/resetpassword",
  ],
};
