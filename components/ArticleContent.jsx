"use client";

import React from "react";
import { Container, Text } from "@chakra-ui/react";
const ArticleContent = ({ title, content, createdDate }) => {
  const a = String(createdDate);
  return (
    <div>
      <Container maxW={"4xl"} mt={'5rem'}>
        <Text fontSize={"5xl"} mt={3} mb={5} style={{fontWeight:500}} textAlign={"center"}>
          {title}
        </Text>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
        <Text style={{fontStyle:"italic"}} fontSize={"xl"} mb={8} mt={7}>
          Published on: {a.substring(0, 10)}
        </Text>
      </Container>
    </div>
  );
};

export default ArticleContent;
