import React, { useState } from "react";
import { Box, Button, Card, Heading, Input, Label } from "@twilio-paste/core";
import { Link, navigate } from "@reach/router";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../store/authSlice";

export const LOGIN_FORM_MODES = {
  LOGIN: "LOGIN",
  SIGNUP: "SIGNUP",
};

export const LOGIN_ROUTES = {
  LOGIN: "login",
  SIGNUP: "signup",
};

const headings = {
  LOGIN: "Login",
  SIGNUP: "Sign Up",
};

const linkText = {
  LOGIN: "New here? Sign Up Instead!",
  SIGNUP: "Already a member? Login here!",
};

const initialFormState = {
  userName: "",
  email: "",
  password: "",
};

const switchFormModes = (formMode) => {
  return formMode === LOGIN_FORM_MODES.LOGIN
    ? LOGIN_FORM_MODES.SIGNUP
    : LOGIN_FORM_MODES.LOGIN;
};

const LoginForm = (props) => {
  const { formMode, onSubmit, isLoading } = props;
  const [formValues, setFormValues] = useState(initialFormState);
  const { userName, email, password } = formValues;
  const dispatch = useDispatch();
  const state = useSelector(authSelector);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(onSubmit({ email, password, formMode }));
  };

  const renderUserName = (formMode) => {
    return formMode === LOGIN_FORM_MODES.SIGNUP ? (
      <Box>
        <Label htmlFor="username" required>
          Username
        </Label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={formValues.userName}
          onChange={(event) => {
            setFormValues((prev) => ({
              ...prev,
              userName: event.userName.value,
            }));
          }}
          required
        />
      </Box>
    ) : null;
  };

  return (
    <Box {...props}>
      <Card padding="space110">
        <Heading as="h1" variant="heading10">
          {headings[formMode] + " 📝"}
        </Heading>
        <Box>
          <form onSubmit={handleSubmit}>
            {/* {renderUserName(formMode)} */}
            {/* Renders UserName only if the formMode is SIGNUP*/}
            <Box marginTop="space50">
              <Label htmlFor="email_address" required>
                Email address
              </Label>
              <Input
                id="email_address"
                name="email_address"
                type="email"
                placeholder="Enter Your Email"
                value={formValues.email}
                onChange={(event) => {
                  setFormValues((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }));
                }}
                required
              />
            </Box>
            <Box marginTop="space50">
              <Label htmlFor="user_password" required>
                Password
              </Label>
              <Input
                id="user_password"
                name="user_password"
                type="password"
                placeholder="Enter Your Password"
                value={formValues.password}
                onChange={(event) => {
                  setFormValues((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }));
                }}
                required
              />
            </Box>
            <Box marginTop="space100">
              <Button fullWidth type="submit" loading={isLoading}>
                {headings[formMode]}
              </Button>
            </Box>
          </form>
          <Box marginTop="space40">
            <Link to={`/${LOGIN_ROUTES[switchFormModes(formMode)]}`}>
              {linkText[formMode]}
            </Link>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default LoginForm;
