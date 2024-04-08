import Article from "../../../../models/Article";
import { connectToDB } from "../../../../utils/database";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

export async function POST(req) {
  const uploadFolderPath = "public/uploads";
  if (!fs.existsSync(uploadFolderPath)) {
    fs.mkdirSync(uploadFolderPath, { recursive: true });
  }
  try {
    await connectToDB();
    let filePath = "";

    const data = await req.formData();
    const title = data.get("title");
    const description = data.get("description");
    const content = data.get("content");
    const category = data.get("category");
    const author = data.get("author");
    const token = headers().get("authorization");

    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    jwt.verify(
      token.split(" ")[1],
      process.env.WEB_TOKEN,
      (err, decoded) => {
        if (err) {
          return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
          );
        }
        req.userId = decoded.userId; // Add userId to request object
      }
    );

    // file upload logic
    for (const entry of Array.from(data.entries())) {
      const value = entry[1];

      const isFile = typeof value === "object";

      if (isFile) {
        const blob = value;
        const filename = blob.name;
        filePath = path.join(
          uploadFolderPath,
          String(Date.now()) + filename.replace(/\s+/g, "")
        );

        // Check if the file already exists
        if (fs.existsSync(filePath)) {
          return NextResponse.json(
            { message: "File is already there" },
            { status: 500 }
          );
        }

        const buffer = Buffer.from(await blob.arrayBuffer());

        fs.writeFileSync(filePath, buffer);

        console.log(`File saved: ${filePath}`);
      }
    }

    const newArticle = new Article({
      title,
      description,
      content,
      category,
      imageURL: filePath,
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
