import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {offers} from "./mocks/offers.js";

const init = () => {
  ReactDOM.render(
      <App
        offers={offers}
        onCardTitleClick={() =>{}}
      />,
      document.querySelector(`#root`)
  );
};

init();
