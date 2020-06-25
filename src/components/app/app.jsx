import React from "react";
import PropTypes from "prop-types";
import MainPage from "../main/main.jsx";

const App = (props) => {
  const {numberOfOffers, offersTitles, onCardTitleClick} = props;

  return <MainPage
    numberOfOffers={numberOfOffers}
    offersTitles={offersTitles}
    onCardTitleClick={onCardTitleClick}/>;
};

App.propTypes = {
  numberOfOffers: PropTypes.number.isRequired,
  offersTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCardTitleClick: PropTypes.func.isRequired
};

export default App;
