import React from "react";
import { Box, Button, Flex, Heading, Stack } from "@twilio-paste/core";
import { Link } from "@reach/router";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, authSlice } from "../store/authSlice";

const HomePage = () => {
  const { user } = useSelector(authSelector);
  console.log(user);
  const dispatch = useDispatch();

  const UnAuthenticatedContent = () => {
    return (
      <Box>
        <Stack orientation="horizontal" spacing="1em">
          <Link to="login">
            <Button>Login</Button>
          </Link>
          <Link to="signup">
            <Button>Sign Up</Button>
          </Link>
        </Stack>
      </Box>
    );
  };

  const AuthenticatedContent = () => {
    return (
      <Box>
        <Flex vertical hAlignContent="center">
          <Heading as="h1">{user.email}</Heading>
          <Button
            onClick={() => {
              dispatch(authSlice.actions.clearUser());
            }}
          >
            Logout
          </Button>
        </Flex>
      </Box>
    );
  };

  return (
    <Flex height="100vh" hAlignContent="center" vAlignContent="center">
      {user && <AuthenticatedContent dispatch={dispatch} />}
      {!user && <UnAuthenticatedContent />}
    </Flex>
  );
};

export default HomePage;
