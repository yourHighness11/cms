import Article from "../../../../models/Article";
import { connectToDB } from "../../../../utils/database";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

export async function POST(req) {
  try {
    await connectToDB();

    const data = await req.formData();
    const title = data.get("title");
    const description = data.get("description");
    const content = data.get("content");
    const category = data.get("category");
    const author = data.get("author");
    const imageURL = data.get("image");
    const token = headers().get("authorization");

    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    jwt.verify(token.split(" ")[1], process.env.WEB_TOKEN, (err, decoded) => {
      if (err) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      req.userId = decoded.userId; // Add userId to request object
    });

    const newArticle = new Article({
      title,
      description,
      content,
      category,
      imageURL,
      author,
      createdAt: Date.now(),
    });

    await newArticle.save();

    return NextResponse.json(
      { message: "Article created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating article" },
      { status: 500 }
    );
  }
}
