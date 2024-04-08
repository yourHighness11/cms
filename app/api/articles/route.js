import { connectToDB } from "../../../utils/database";
import Article from "../../../models/Article";
import User from "../../../models/User";
export const GET = async (request) => {
  try {
    await connectToDB();
    const articles = await Article.find({})
      .populate("author", "name")
      .sort({ createdAt: -1 });
    // console.log(articles);
    return new Response(JSON.stringify(articles), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all articles", { status: 500 });
  }
};
