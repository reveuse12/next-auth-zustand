import connectDB from "@/db/connectDB";
import User from "@/models/user.model";

const generateTokenAndRefreshTokens = async (userid) => {
  try {
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
  await connectDB();
  try {
    const { email, password } = await request.json();
    if (!email || !password)
      return new Response(
        JSON.stringify({ message: "Please fill all fields" }),
        {
          status: 400,
        }
      );

    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 400,
      });

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect)
      return new Response(JSON.stringify({ message: "Invalid Password" }), {
        status: 400,
      });

    const { token, refreshToken } = await generateTokenAndRefreshTokens(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return new Response(
      JSON.stringify({
        user: loggedInUser,
        token,
        refreshToken,
        options,
        message: "User Logged In Successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log("error in login route", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
