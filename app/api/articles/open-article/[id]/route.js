import { connectToDB } from "../../../../../utils/database";
import Article from "../../../../../models/Article";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const article = await Article.findById(params.id);

    return new Response(JSON.stringify(article), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all articles", { status: 500 });
  }
};
