import React from "react";
import PropTypes from "prop-types";
import MainPage from "../main/main.jsx";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import OfferDetails from "../offer-details/offer-details.jsx";

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      detailedOffer: null
    };
    this._setActiveCard = this._setActiveCard.bind(this);
  }

  _setActiveCard(card) {
    this.setState(() => {
      return {detailedOffer: card};
    });
  }

  render() {
    const {offers} = this.props;

    return <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage
            offers={offers}
            onCardTitleClick={this._setActiveCard}
          />
        </Route>
        <Route exact path="/property">
          {this.state.detailedOffer && <OfferDetails offer={this.state.detailedOffer}/>}
        </Route>
      </Switch>
    </BrowserRouter>;
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default App;
