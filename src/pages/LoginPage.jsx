import { navigate } from "@reach/router";
import { Flex, Toaster, useToaster } from "@twilio-paste/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import LoginForm, { LOGIN_FORM_MODES } from "../components/LoginForm";
import { authSelector, authSlice, authenticateUser } from "../store/authSlice";

const LoginPage = () => {
  const { user, loading, success, error } = useSelector(authSelector);
  console.log(error);
  const dispatch = useDispatch();
  const toaster = useToaster();

  useEffect(() => {
    if (user) navigate("/", { replace: true });
    else dispatch(authSlice.actions.clearState());
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (success) {
      navigate("/", { replace: true });
    }
    if (error) {
      console.log(error);
      toaster.push({
        message: error,
        variant: "error",
        dismissAfter: 7000,
      });
      dispatch(authSlice.actions.clearState());
    }
  }, [success, error, toaster, navigate, dispatch]);

  return (
    <Flex height="100vh" hAlignContent="center" vAlignContent="center">
      <LoginForm
        maxWidth="370px"
        width="100%"
        formMode={LOGIN_FORM_MODES.LOGIN}
        onSubmit={authenticateUser}
        isLoading={loading}
      />
      <Toaster {...toaster} />
    </Flex>
  );
};

export default LoginPage;
