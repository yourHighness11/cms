import { connectToDB } from "../../../../utils/database";
import User from "../../../../models/User";
import { verifyPassword } from "../../../../utils/auth";
import jwt from "jsonwebtoken";
export const POST = async (req) => {
  const { email, password } = await req.json();
  // console.log({ email, password });
  try {
    await connectToDB(); // Establish database connection

    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
      });
    }

    if (!(await verifyPassword(password, user.password))) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
      });
    }

    if (user && (await verifyPassword(password, user.password))) {
      const token = await jwt.sign(
        { user_id: user._id, email },
        process.env.WEB_TOKEN,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      return new Response(
        JSON.stringify({
          user_id: user._id,
          user_name: user.name,
          email: user.email,
          token: user.token,
        }),
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error logging in" }), {
      status: 500,
    });
  }
};
