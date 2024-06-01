import connectDB from "@/db/connectDB";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const { code } = await request.json();
    console.log("Received code:", code);

    const user = await User.findOne({
      verifyToken: code,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    console.log("Found user:", user);

    if (!user) {
      console.log("User not found or token expired");
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    user.isVerfied = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: "Account verified" }, { status: 200 });
  } catch (error) {
    console.error("Error verifying account:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
