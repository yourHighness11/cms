"use client";

import {
  Flex,
  ButtonGroup,
  Spacer,
  Box,
  Image,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Nav = ({ loading }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("userData")));
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("userData");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div>
      <Flex
        bg={"white"}
        minWidth="max-content"
        alignItems="center"
        gap="2"
        pos="fixed"
        w="100%"
        zIndex={1}
        top={0}
        boxShadow="xl"
      >
        <Link href="/">
          <Box p="2" ml={5}>
            <Image
              borderRadius="full"
              boxSize="50px"
              src="https://www.freepnglogos.com/uploads/logo-website-png/logo-website-update-likable-art-9.png"
              alt="logo"
            />
          </Box>
        </Link>

        <Spacer />
        <ButtonGroup gap="2" mr={5}>
          {items ? (
            <>
              <Link href={`/profile?id=${items.user_id}`}>
                <Button
                  colorScheme="green"
                  variant="outline"
                  isLoading={loading}
                >
                  My Profile
                </Button>
              </Link>
              <Link href={`/create-article/${items.user_id}/article`}>
                <Button
                  colorScheme="messenger"
                  variant="outline"
                  isLoading={loading}
                >
                  Create Article
                </Button>
              </Link>
              <Link href={"/"}>
                <Button
                  colorScheme="red"
                  isLoading={loading}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href={"/users/signup"}>
                <Button colorScheme="orange" isLoading={loading}>
                  Sign Up
                </Button>
              </Link>
              <Link href={"/users/login"}>
                <Button colorScheme="green" isLoading={loading}>
                  Log in
                </Button>
              </Link>
            </>
          )}
        </ButtonGroup>
      </Flex>
    </div>
  );
};

export default Nav;
