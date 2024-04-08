import { connectToDB } from "../../../../utils/database";
import Article from "../../../../models/Article";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

export const GET = async (request, { params }) => {
  let userArticles = [];
  try {
    await connectToDB();
    const token = headers().get("authorization");

    if (!token) {
      return new Response({ message: "No token provided" }, { status: 401 });
    }

    const decoded = await jwt.verify(
      token.split(" ")[1],
      process.env.WEB_TOKEN
    );

    if (!decoded) {
      return new Response({ message: "Unauthorized" }, { status: 401 });
    }
    const articles = await Article.find({ author: params.id }).populate(
      "author",
      "name"
    );

    if (!articles) return new Response("Articles Not Found", { status: 404 });
    return new Response(JSON.stringify(articles), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user articles", { status: 500 });
  }
};

// export const PATCH = async (request, { params }) => {
//   const { prompt, tag } = await request.json();

//   try {
//     await connectToDB();

//     // Find the existing prompt by ID
//     const existingPrompt = await Prompt.findById(params.id);

//     if (!existingPrompt) {
//       return new Response("Prompt not found", { status: 404 });
//     }

//     // Update the prompt with new data
//     existingPrompt.prompt = prompt;
//     existingPrompt.tag = tag;

//     await existingPrompt.save();

//     return new Response("Successfully updated the Prompts", { status: 200 });
//   } catch (error) {
//     return new Response("Error Updating Prompt", { status: 500 });
//   }
// };

// export const DELETE = async (request, { params }) => {
//   try {
//     await connectToDB();

//     // Find the prompt by ID and remove it
//     await Prompt.findByIdAndDelete(params.id);

//     return new Response("Prompt deleted successfully", { status: 200 });
//   } catch (error) {
//     return new Response("Error deleting prompt", { status: 500 });
//   }
// };
