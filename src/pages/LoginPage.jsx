import { navigate } from "@reach/router";
import { Flex, Toaster, useToaster } from "@twilio-paste/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import LoginForm, { LOGIN_FORM_MODES } from "../components/LoginForm";
import { authSelector, logUserIn } from "../store/authSlice";

const LoginPage = () => {
  const { user, loading, success, error } = useSelector(authSelector);
  console.log(error);
  const toaster = useToaster();

  useEffect(() => {
    if (success) {
      navigate("/");
    }
    if (error) {
      console.log(error);
      toaster.push({
        message: error,
        variant: "error",
      });
    }
  }, [success, error]);

  return (
    <Flex height="100vh" hAlignContent="center" vAlignContent="center">
      <LoginForm
        maxWidth="370px"
        width="100%"
        formMode={LOGIN_FORM_MODES.LOGIN}
        onSubmit={logUserIn}
        isLoading={loading}
      />
      <Toaster {...toaster} />
    </Flex>
  );
};

export default LoginPage;
