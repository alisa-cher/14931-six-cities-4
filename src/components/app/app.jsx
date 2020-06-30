import React from "react";
import PropTypes from "prop-types";
import MainPage from "../main/main.jsx";

const App = (props) => {
  const {offers, onCardTitleClick} = props;

  return <MainPage
    offers={offers}
    onCardTitleClick={onCardTitleClick}
  />;
};

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCardTitleClick: PropTypes.func.isRequired
};

export default App;
