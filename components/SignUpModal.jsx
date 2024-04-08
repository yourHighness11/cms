"use client";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Container,
  Card,
  CardBody,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";
const SignUpModal = ({
  setName,
  setEmail,
  setMobile,
  setPassword,
  handleSubmit,
  loading,
}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <div>
      <Container maxW="2xl" mt="5rem">
        <Text fontSize={"5xl"} textAlign={"center"} mb={8}>
          Sign Up
        </Text>
        <Card mb={5} boxShadow="dark-lg">
          <CardBody>
            <FormControl isRequired>
              <FormLabel>Full name</FormLabel>
              <Input
                id="name"
                required
                minLength={3}
                placeholder="Rohit Sharma"
                mb={3}
                onChange={(e) => setName(e.target.value)}
              />
              <FormLabel>Email</FormLabel>
              <Input
                id="email"
                required
                minLength={8}
                type="email"
                placeholder="abc@gmail.com"
                mb={3}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel>Phone</FormLabel>
              <Input
                id="phone"
                required
                minLength={10}
                type="tel"
                placeholder="minimum 10 numbers(1234567897)"
                mb={3}
                onChange={(e) => setMobile(e.target.value)}
              />
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  id="password"
                  required
                  minLength={8}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="use strong password"
                  mb={3}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Link href="/">
              <Button variant={"ghost"}>Cancel</Button>
            </Link>
            <Button
              isLoading={loading}
              colorScheme={"blue"}
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default SignUpModal;
