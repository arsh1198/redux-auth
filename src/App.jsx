import React, { useEffect } from "react";
import { Theme } from "@twilio-paste/core/theme";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { Redirect, Router } from "@reach/router";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import { LOGIN_ROUTES } from "./components/LoginForm";
import { Provider, useDispatch, useSelector } from "react-redux";
import { authSelector, authSlice, tryLocalSignIn } from "./store/authSlice";
import { Spinner } from "@twilio-paste/core";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(authSelector);

  console.log("USER =>", user);
  console.log(localStorage.getItem("user-info"));

  useEffect(() => {
    dispatch(tryLocalSignIn());
  }, []);

  return (
    <div className="App">
      {loading && <LoadingSpinner />}
      {!loading && (
        <Router>
          {<HomePage path="/" />}
          <LoginPage path={LOGIN_ROUTES.LOGIN} />
          <SignUpPage path={LOGIN_ROUTES.SIGNUP} />
        </Router>
      )}
    </div>
  );
}

export default App;
