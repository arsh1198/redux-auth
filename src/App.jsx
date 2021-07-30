import React from "react";
import { Theme } from "@twilio-paste/core/theme";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { Router } from "@reach/router";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import { LOGIN_ROUTES } from "./components/LoginForm";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Theme.Provider>
        <div className="App">
          <Router>
            <HomePage path="/" />
            <LoginPage path={LOGIN_ROUTES.LOGIN} />
            <SignUpPage path={LOGIN_ROUTES.SIGNUP} />
          </Router>
        </div>
      </Theme.Provider>
    </Provider>
  );
}

export default App;
