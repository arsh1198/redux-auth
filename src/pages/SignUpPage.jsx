import { Flex } from "@twilio-paste/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import LoginForm, { LOGIN_FORM_MODES } from "../components/LoginForm";
import { authSelector, logUserIn } from "../store/authSlice";
import { navigate } from "@reach/router";

const SignUpPage = () => {
  const { user, loading, success, error } = useSelector(authSelector);

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);

  return (
    <Flex height="100vh" hAlignContent="center" vAlignContent="center">
      <LoginForm
        width="400px"
        formMode={LOGIN_FORM_MODES.SIGNUP}
        onSubmit={logUserIn}
        isLoading={loading}
      />
    </Flex>
  );
};

export default SignUpPage;
