import { connectToDB } from "../../../utils/database";
import Article from "../../../models/Article";
import User from "../../../models/User";
import { revalidatePath } from "next/cache";
export const GET = async (request) => {
  try {
    await connectToDB();
    const articles = await Article.find({})
      .populate("author", "name", User)
      .sort({ createdAt: -1 });
    // console.log(articles);
    revalidatePath("/");
    return new Response(JSON.stringify(articles), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all articles", { status: 500 });
  }
};
