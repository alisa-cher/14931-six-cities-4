import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const numberOfOffers = 17;

const init = () => {
  ReactDOM.render(
      <App numberOfOffers={numberOfOffers}/>,
      document.querySelector(`#root`)
  );
};

init();
