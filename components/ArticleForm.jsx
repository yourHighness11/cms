"use client";

import {
  Text,
  Textarea,
  Input,
  Card,
  CardBody,
  Center,
  Container,
  Button,
  Select,
} from "@chakra-ui/react";
import Link from "next/link";
import TextEditor from "./TextEditor";
const ArticleForm = ({
  setTitle,
  setCategory,
  setImage,
  handleSubmit,
  editorState,
  setEditorState,
  loading
}) => {
  return (
    <div>
      <Container maxW="5xl" mt="5rem">
        <Card boxShadow="dark-lg">
          <CardBody>
            <Center fontSize={"2xl"}>Create Article</Center>
            <Text mb={1}>Title</Text>
            <Input
              id="title"
              mb={4}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Text mb={1}>Description</Text>
            <TextEditor
              editorState={editorState}
              setEditorState={setEditorState}
            />
            <Text mb={1} mt={5}>
              Category
            </Text>
            <Select
              id="category"
              mb={4}
              placeholder="Select option"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Finance">Finance</option>
              <option value="Technology">Technology</option>
              <option value="Events">Events</option>
              <option value="Marketing">Marketing</option>
              <option value="Health">Health</option>
              <option value="Science">Science</option>
              <option value="Business">Business</option>
              <option value="Sports">Sports</option>
              {/* <option value="option3">Option 3</option>
              <option value="option3">Option 3</option>
              <option value="option3">Option 3</option> */}
            </Select>
            <Text mb={1}>Upload Image</Text>
            <Input
              id="image"
              mb={5}
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            ></Input>
            <Link href="/">
              <Button mr={5} variant={"ghost"}>
                Cancel
              </Button>
            </Link>
            <Button isLoading={loading} colorScheme={"blue"} onClick={handleSubmit}>
              Submit
            </Button>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default ArticleForm;
