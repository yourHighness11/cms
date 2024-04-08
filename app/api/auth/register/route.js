import { connectToDB } from "../../../../utils/database";
import User from "../../../../models/User";
import { hashPassword } from "../../../../utils/auth";
import jwt from "jsonwebtoken";
export const POST = async (req) => {
  const { name, email, mobile, password } = await req.json();
  // console.log({ name, email, mobile, password });
  try {
    await connectToDB(); // Establish database connection

    // Validate data (consider using a validation library like Yup)
    if (!name || !email || !mobile || !password) {
      return new Response(
        JSON.stringify({ message: "Please fill in all required fields" }),
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "Email or mobile number already exists" }),
        { status: 400 }
      );
    }


    const user = new User({
      name,
      email,
      mobile,
      password: await hashPassword(password), // Use hashed password
    });

    const token = await jwt.sign(
      { user_id: user._id, email },
      process.env.WEB_TOKEN,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;
    await user.save();

    return new Response(
      JSON.stringify({
        user_id: user._id,
        user_name: user.name,
        email: user.email,
        token: user.token,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error registering user" }), {
      status: 500,
    });
  }
};
