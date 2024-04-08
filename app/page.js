"use client";

import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import Search from "../components/Search";
import Categories from "../components/Categories";
import { Container, Grid, GridItem, Input, Button } from "@chakra-ui/react";
import Nav from "../components/Nav";

const page = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState();
  const fetchArticles = async () => {
    try {
      const response = await fetch(`/api/articles`);
      const articleData = await response.json();
      if (articleData) {
        setData(articleData);
        setCategory(articleData);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, []);

  const handleClick = async (event) => {
    setCategory(data);
    if (event.target.tagName === "LI") {
      const clickedItem = event.target.textContent;
      console.log(clickedItem);
      const categorisedData = data.filter((i) => i.category == clickedItem);
      setCategory(categorisedData);
    }
  };

  const handleSearch = async () => {
    setCategory(data);
    const filtered = data.filter((item) => {
      return Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
      );
    });
    setCategory(filtered);
    setSearch("");
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = category.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <section>
      <Nav />
      <Container maxW="6xl" mt="100px" mb={10}>
        <Grid templateColumns="repeat(4, 1fr)" gap={10}>
          <GridItem colSpan={3}>
            {currentPosts.map((item) => (
              <ArticleCard
                key={item._id}
                articleId={item._id}
                title={item.title}
                description={item.description}
                category={item.category}
                author={item.author.name}
                publishedDate={item.createdAt.substring(0, 10)}
                imageSrc={("/" + item.imageURL.replace(/\\/g, "/")).substring(
                  7
                )}
              />
            ))}
            {/* pagination */}
            <div>
              {[...Array(Math.ceil(category.length / postsPerPage)).keys()].map(
                (number) => (
                  <Button
                    mr={2}
                    colorScheme="teal"
                    variant="outline"
                    key={number}
                    onClick={() => paginate(number + 1)}
                  >
                    {number + 1}
                  </Button>
                )
              )}
            </div>
          </GridItem>
          <GridItem colStart={4} colEnd={8}>
            <Search setSearch={setSearch} handleSearch={handleSearch} />
            <Categories handleSubmit={handleClick} />
          </GridItem>
        </Grid>
      </Container>
    </section>
  );
};

export default page;
