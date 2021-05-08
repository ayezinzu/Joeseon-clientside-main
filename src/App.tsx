import React from "react";
import AppRoutes from "./routes";
import { Provider } from "react-redux";
import { store } from "./store";
import "antd/dist/antd.css";
import "./styles/_main.scss";
import {
  AUTHENTICATED,
  UNAUTHENTICATED,
} from "./store/definitions/authConstants";

const token = localStorage.getItem("accessToken");
if (token) {
  store.dispatch({
    type: AUTHENTICATED,
    payload: {
      authenticated: true,
    },
  });
} else {
  store.dispatch({
    type: UNAUTHENTICATED,
    payload: {
      authenticated: false,
    },
  });
}

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRoutes />
      </div>
    </Provider>
  );
};

export default App;
