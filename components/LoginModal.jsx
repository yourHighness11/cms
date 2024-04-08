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
const LoginModal = ({ setEmail, setPassword, handleSubmit, loading }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <div>
      <Container maxW="2xl" mt="5rem">
        <Text fontSize={"5xl"} textAlign={"center"} mb={8}>
          Login
        </Text>
        <Card mb={5} boxShadow="dark-lg">
          <CardBody>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                mb={3}
                onChange={(e) => setEmail(e.target.value)}
                // onChange={handleInputChange}
              />
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  id="password"
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
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

export default LoginModal;
