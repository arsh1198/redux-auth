import { Flex, Toaster, useToaster } from "@twilio-paste/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm, { LOGIN_FORM_MODES } from "../components/LoginForm";
import { authSelector, authSlice, authenticateUser } from "../store/authSlice";
import { navigate } from "@reach/router";

const SignUpPage = () => {
  const { user, loading, success, error } = useSelector(authSelector);
  const toaster = useToaster();
  const dispatch = useDispatch();

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
  }, [success, error, toaster, dispatch, navigate]);

  return (
    <Flex height="100vh" hAlignContent="center" vAlignContent="center">
      <LoginForm
        width="400px"
        formMode={LOGIN_FORM_MODES.SIGNUP}
        onSubmit={authenticateUser}
        isLoading={loading}
      />
      <Toaster {...toaster} />
    </Flex>
  );
};

export default SignUpPage;
