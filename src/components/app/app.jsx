import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import {cityShape} from "../../types.js";
import MainPage from "../main/main.jsx";
import OfferDetails from "../offer-details/offer-details.jsx";
import comments from "../../mocks/comments";

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      detailedOffer: null,
    };
    this._setActiveCard = this._setActiveCard.bind(this);
  }

  _setActiveCard(card) {
    this.setState(() => {
      return {detailedOffer: card};
    });
  }

  render() {
    const detailedOffer = this.state.detailedOffer;

    const {
      offers,
      onMenuClick,
      locations,
      city,
      cityCoords,
      cityZoom
    } = this.props;

    return <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage
            offers={offers}
            onCardTitleClick={this._setActiveCard}
            locations={locations}
            activeLocation={city}
            onMenuClick={onMenuClick}
            cityCoords={cityCoords}
            cityZoom={cityZoom}
          />
        </Route>
        <Route exact path="/property">
          {detailedOffer && <OfferDetails
            offer={detailedOffer}
            nearbyOffers={offers}
            comments={comments}
            onCardTitleClick={this._setActiveCard}
            cityCoords={cityCoords}
            cityZoom={cityZoom}/>
          }
        </Route>
      </Switch>
    </BrowserRouter>;
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape(cityShape)).isRequired,
  city: PropTypes.shape(cityShape).isRequired,
  cityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  cityZoom: PropTypes.number.isRequired,
  onMenuClick: PropTypes.func.isRequired,
};

// TODO: куда-то вынести эту функцию
const filterOffers = (offers, location) => {
  return offers.filter((offer) => offer.city.name === location);
};

// TOASK: правильно ли вообще так делать? (см. стр. 84-86)
const mapStateToProps = (state) => ({
  offers: filterOffers(state.offers, state.city.name),
  city: state.city,
  cityCoords: [state.city.location.latitude, state.city.location.longitude],
  cityZoom: state.city.location.zoom,
  locations: state.offers.map((offer) => offer.city)
});

const mapDispatchToProps = (dispatch) => ({
  onMenuClick(location) {
    dispatch(ActionCreator.setActiveLocation(location));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
