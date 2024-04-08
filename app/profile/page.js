"use client";
import { useSearchParams } from "next/navigation";
import Profile from "../../components/Profile";
import { useEffect, useState } from "react";
import ArticleCard from "../../components/ArticleCard";
import { Container } from "@chakra-ui/react";
import Nav from "../../components/Nav";
const page = () => {
  const [data, setData] = useState([]);
  const searchParams = useSearchParams();
  const { user_name, token } = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    // setUserId(searchParams.get("id"));
    const fetchArticles = async () => {
      const response = await fetch(`/api/articles/${searchParams.get("id")}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const articleData = await response.json();
      if (articleData) {
        setData(articleData);
      }
    };
    if (searchParams.get("id")) fetchArticles();
  }, [searchParams.get("id")]);

  return (
    <section>
    <Nav />
      <Container maxW="4xl">
        <Profile userName={user_name} />
        {data.map((item) => (
          <ArticleCard
            key={item._id}
            articleId={item._id}
            title={item.title}
            description={item.description}
            category={item.category}
            author={item.author.name}
            imageSrc={("/" + item.imageURL.replace(/\\/g, "/")).substring(7)}
          />
        ))}
      </Container>
    </section>
  );
};

export default page;
