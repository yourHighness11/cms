"use client";

import React, { useEffect, useState } from "react";
import ArticleContent from "../../components/ArticleContent";
import { useSearchParams } from "next/navigation";
import Nav from "../../components/Nav";

const getArticle = () => {
  const [data, setData] = useState("");
  const searchParams = useSearchParams();
  const fetchArticle = async () => {
    try {
      const response = await fetch(
        `/api/articles/open-article/${searchParams.get("id")}`
      );
      const articleData = await response.json();
      if (articleData) {
        setData(articleData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchArticle();
  }, []);
  return (
    <section>
      <Nav />
      <ArticleContent
        title={data.title}
        content={data.content}
        createdDate={data.createdAt}
      />
    </section>
  );
};

export default getArticle;
