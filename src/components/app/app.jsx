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
      activeCard: null,
    };
    this._setDetailedOffer = this._setDetailedOffer.bind(this);
    this._setActiveCard = this._setActiveCard.bind(this);
    this._resetActiveCard = this._resetActiveCard.bind(this);
  }

  _setDetailedOffer(card) {
    this.setState(() => {
      return {detailedOffer: card};
    });
  }

  _setActiveCard(card) {
    this.setState(() => {
      return {activeCard: card};
    });
  }

  _resetActiveCard() {
    this.setState(() => {
      return {activeCard: null};
    });
  }

  render() {
    const detailedOffer = this.state.detailedOffer;
    const activeCard = this.state.activeCard;

    const {
      offers,
      onMenuClick,
      onSortingClick,
      activeSorting,
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
            onCardTitleClick={this._setDetailedOffer}
            onCardHover={this._setActiveCard}
            onCardMouseLeave={this._resetActiveCard}
            locations={locations}
            activeLocation={city}
            activeOffer={detailedOffer}
            activeCard={activeCard}
            onMenuClick={onMenuClick}
            onSortingClick={onSortingClick}
            activeSorting={activeSorting}
            cityCoords={cityCoords}
            cityZoom={cityZoom}
          />
        </Route>
        <Route exact path="/property">
          {detailedOffer && <OfferDetails
            offer={detailedOffer}
            activeCard={activeCard}
            nearbyOffers={offers}
            comments={comments}
            onCardTitleClick={this._setDetailedOffer}
            onCardHover={this._setActiveCard}
            onCardMouseLeave={this._resetActiveCard}
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
  onSortingClick: PropTypes.func.isRequired,
  activeSorting: PropTypes.string.isRequired,
};

// TODO: вынести потом отдельно эти функции
const filterOffers = (offers, location) => {
  return offers.filter((offer) => offer.city.name === location);
};

const sortOffers = (offers, activeSort) => {
  switch (activeSort) {
    case `to-high`:
      return offers.slice().sort((a, b) => (a.price > b.price) ? 1 : -1);
    case `to-low`:
      return offers.slice().sort((a, b) => (a.price < b.price) ? 1 : -1);
    case `top-rated`:
      return offers.slice().sort((a, b) => (a.rating < b.rating) ? 1 : -1);
    default:
      return offers;
  }
};

const getCities = (offers) => {
  const cities = [];
  const findElement = (property) => cities.some((el) => el.name === property);
  offers.map((offer) => {
    if (!findElement(offer.city.name)) {
      cities.push(offer.city);
    }
  });
  return cities;
};

const mapStateToProps = (state) => ({
  offers: sortOffers(filterOffers(state.offers, state.city.name), state.sorting),
  city: state.city,
  activeSorting: state.sorting,
  cityCoords: [state.city.location.latitude, state.city.location.longitude],
  cityZoom: state.city.location.zoom,
  locations: getCities(state.offers)
});

const mapDispatchToProps = (dispatch) => ({
  onMenuClick(location) {
    dispatch(ActionCreator.setActiveLocation(location));
  },
  onSortingClick(option) {
    dispatch(ActionCreator.setActiveSorting(option));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
