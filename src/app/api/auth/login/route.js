import connectDB from "@/db/connectDB";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

const generateTokenAndRefreshTokens = async (userid) => {
  try {
    await connectDB();
    const user = await User.findById(userid);
    const token = user.generateToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshTokens = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { token, refreshToken };
  } catch (error) {
    console.log("error generating tokens", error);
  }
};

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();
    if (!email || !password)
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );

    const user = await User.findOne({ email }).select("+password+isVerfied");

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 400 });

    if (!user.isVerfied)
      return NextResponse.json(
        { message: "Account not verified. Please verify your account." },
        { status: 401 }
      );

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect)
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 400 }
      );

    const { token, refreshToken } = await generateTokenAndRefreshTokens(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    };

    const tokenCookie = `token=${token}; HttpOnly; Secure=${options.secure}; SameSite=${options.sameSite}; Path=${options.path}; Max-Age=${options.maxAge}`;
    const refreshTokenCookie = `refreshToken=${refreshToken}; HttpOnly; Secure=${options.secure}; SameSite=${options.sameSite}; Path=${options.path}; Max-Age=${options.maxAge}`;

    return NextResponse.json(
      {
        user: loggedInUser,
        message: "User Logged In Successfully",
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": [tokenCookie, refreshTokenCookie],
        },
      }
    );
  } catch (error) {
    console.log("error in login route", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
