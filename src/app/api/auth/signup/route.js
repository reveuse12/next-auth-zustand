import connectDB from "@/db/connectDB";
import User from "@/models/user.model.js";
import { NextResponse } from "next/server";
import { sendEmail } from "@/helpers/SendEmail";

export async function POST(request) {
  await connectDB();
  try {
    const { username, name, email, password } = await request.json();

    if (!username || !password || !email || !name)
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );

    const alreadyUser = await User.findOne({ username });

    if (alreadyUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = await User.create({
      username: username,
      name: name,
      email,
      password,
    });

    const createdUser = await User.findById(newUser._id).select(
      "-password -refreshToken"
    );

    if (!createdUser)
      return NextResponse.json(
        { message: "Error while creating new user" },
        { status: 500 }
      );

    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: createdUser._id,
    });

    return NextResponse.json(
      { message: "Verification e-mail sent" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
