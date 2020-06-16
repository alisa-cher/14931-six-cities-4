import React from "react";
import MainPage from "../../../main.jsx";

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {numberOfOffers} = props;

  return <MainPage numberOfOffers={numberOfOffers}/>;
};

export default App;
