"use client";

import ArticleForm from "../../../../components/ArticleForm";
import { useRouter } from "next/navigation";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Nav from "../../../../components/Nav";
const page = () => {
  const [loading, setLoading] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const plainText = editorState.getCurrentContent().getPlainText("\u0001");
  const htmlText = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  const createArticle = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!title || !category || !image || !plainText) {
      window.alert("Please fill all the fields.");
    }
    // console.log({ plainText, htmlText });
    const { user_id, token } = JSON.parse(localStorage.getItem("userData"));
    // console.log(token);
    const formdata = new FormData();
    const imagedata = new FormData();
    imagedata.append("file", image);
    imagedata.append("upload_preset", "cms-app");
    imagedata.append("cloud_name", "de4ilusoj");

    try {
      const imageResponse = await fetch(
        "https://api.cloudinary.com/v1_1/de4ilusoj/image/upload",
        {
          method: "post",
          body: imagedata,
        }
      );
      const imageUrl = await imageResponse.json();
      // console.log(imageUrl.url.toString());
      formdata.append("image", imageUrl.url.toString());
      formdata.append("title", title);
      formdata.append("description", plainText.substring(0, 200));
      formdata.append("content", htmlText);
      formdata.append("category", category);
      formdata.append("author", user_id);
      const response = await fetch("/api/articles/new", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
      });

      if (response.ok) {
        router.push("/");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <Nav />
      <ArticleForm
        setTitle={setTitle}
        setCategory={setCategory}
        setImage={setImage}
        handleSubmit={createArticle}
        editorState={editorState}
        setEditorState={setEditorState}
        loading={loading}
      />
    </section>
  );
};

export default page;
