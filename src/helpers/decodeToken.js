import connectDB from "@/db/connectDB";
import * as jwt from "jsonwebtoken";

export async function verifyAdmin(request) {
  await connectDB();

  const token = request.cookies.get("token")?.value;
  if (!token) {
    return { error: "You are not logged in", status: 400 };
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.isAdmin) {
      return { error: "You are not Admin", status: 403 };
    }
    return { decodedToken };
  } catch (error) {
    return { error: "Invalid token", status: 401 };
  }
}
