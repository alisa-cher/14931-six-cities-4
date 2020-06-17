import React from "react";
import PropTypes from "prop-types";
import MainPage from "../main/main.jsx";

const App = (props) => {
  const {numberOfOffers, offersTitles} = props;

  return <MainPage
    numberOfOffers={numberOfOffers}
    offersTitles={offersTitles}/>;
};

App.propTypes = {
  numberOfOffers: PropTypes.number.isRequired,
  offersTitles: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default App;
