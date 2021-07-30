import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { Theme } from "@twilio-paste/core/dist/theme";
import { store } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme.Provider>
        <App />
      </Theme.Provider>
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);
