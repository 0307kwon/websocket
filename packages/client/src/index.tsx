import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import "./common.less";

const $root = document.querySelector("#root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  $root
);
