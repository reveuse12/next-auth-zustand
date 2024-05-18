import connectDB from "@/db/connectDB";
import User from "@/models/user.model.js";

export async function POST(request) {
  await connectDB();
  try {
    const { username, name, email, password } = await request.json();
    console.log(username, name, email, password);
    if (!username || !password || !email || !name)
      return new Response(
        JSON.stringify({ message: "Please fill all fields" }),
        {
          status: 400,
        }
      );

    const alreadyUser = await User.findOne({ username });

    if (alreadyUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
      });
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
      return new Response(
        JSON.stringify({ message: "error while registering User" }),
        {
          status: 500,
        }
      );

    return new Response(
      JSON.stringify({ message: "User Created Successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
