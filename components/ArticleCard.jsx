"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import {
  Stack,
  HStack,
  VStack,
  Text,
  Heading,
  Button,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
const ArticleCard = ({
  title,
  description,
  category,
  author,
  imageSrc,
  publishedDate,
  articleId,
}) => {
  // console.log(articleId);
  return (
    <div>
      <Card
        mb={10}
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "310px" }}
          height="330px"
          src={imageSrc}
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody pt={1} pb={""}>
            <Heading size="md">{title}</Heading>
            <Text py="2">{description}....</Text>
            <Text
              py="2"
              style={{ fontWeight: "500", fontStyle: "italic" }}
              // mb={5}
            >
              Created by: {author}
            </Text>
            <Text
              py="2"
              style={{ fontWeight: "500", fontStyle: "italic" }}
              mb={5}
            >
              Published on: {publishedDate}
            </Text>
            <Button
              colorScheme="teal"
              variant="outline"
              size="xs"
              style={{ cursor: "default" }}
            >
              {category}
            </Button>
          </CardBody>

          <CardFooter>
            <Link href={`/get-article?id=${articleId}`}>
              <Button variant="solid" colorScheme="blue">
                Read More
              </Button>
            </Link>
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
};

export default ArticleCard;
