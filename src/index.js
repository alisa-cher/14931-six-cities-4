import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const numberOfOffers = 17;
const offersTitles = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`];

const init = () => {
  ReactDOM.render(
      <App
        numberOfOffers={numberOfOffers}
        offersTitles={offersTitles}
        onCardTitleClick={() =>{}}
      />,
      document.querySelector(`#root`)
  );
};

init();
