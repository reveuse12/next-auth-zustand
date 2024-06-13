import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken, "++++++++++++++++++++11111111111111111111");
    return NextResponse.json({ decodedToken }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
