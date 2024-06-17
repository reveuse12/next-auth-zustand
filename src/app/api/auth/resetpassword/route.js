import User from "@/models/user.model";
import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/SendEmail";
import connectDB from "@/db/connectDB";

export async function POST(request) {
  try {
    await connectDB();
    const { code, password } = await request.json();

    const user = await User.findOne({
      forgotPasswordToken: code,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }
    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Password reset successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error resetting password" },
      { status: 400 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const token = request.cookies.get("token")?.value || "";

    if (!token)
      return NextResponse.json({ message: "No token" }, { status: 400 });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken)
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });

    const user = await User.findById(decodedToken._id);

    if (!user) return NextResponse.json({ message: "User not found" });

    await sendEmail({
      email: user.email,
      emailType: "RESET",
      userId: user._id,
    });
    return NextResponse.json(
      { message: "Reset password email sent" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }
}
