import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app/app.js";
import MainPage from "../main/main.jsx";
import OfferDetails from "../offer-details/offer-details.jsx";
import comments from "../../mocks/comments";
import {getVisibleOffers, getCities} from "../../reducer/data/selectors";
import {getCityCoords, getCityZoom, getActiveSorting, getCurrentCity} from "../../reducer/app/selectors";

import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";

const MainPageWrapped = withActiveItem(MainPage);
const OfferDetailsWrapped = withActiveItem(OfferDetails);

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      detailedOffer: null
    };
    this._setDetailedOffer = this._setDetailedOffer.bind(this);
  }

  _setDetailedOffer(card) {
    this.setState(() => {
      return {detailedOffer: card};
    });
  }

  render() {
    const detailedOffer = this.state.detailedOffer;

    const {
      isServerError,
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
          {isServerError && <div> Placeholder for screen announcing an error to the user.</div>}
          {!isServerError && <MainPageWrapped
            offers={offers}
            onCardTitleClick={this._setDetailedOffer}
            locations={locations}
            activeLocation={city}
            activeOffer={detailedOffer}
            onMenuClick={onMenuClick}
            onSortingClick={onSortingClick}
            activeSorting={activeSorting}
            cityCoords={cityCoords}
            cityZoom={cityZoom}
          />}
        </Route>
        <Route exact path="/property">
          {detailedOffer && <OfferDetailsWrapped
            offer={detailedOffer}
            nearbyOffers={offers}
            comments={comments}
            onCardTitleClick={this._setDetailedOffer}
            cityCoords={cityCoords}
            cityZoom={cityZoom}/>
          }
        </Route>
      </Switch>
    </BrowserRouter>;
  }
}

App.propTypes = {
  isServerError: PropTypes.bool,
  offers: PropTypes.arrayOf(PropTypes.object),
  locations: PropTypes.arrayOf(PropTypes.object),
  city: PropTypes.object,
  cityCoords: PropTypes.arrayOf(PropTypes.number),
  cityZoom: PropTypes.number,
  onMenuClick: PropTypes.func,
  onSortingClick: PropTypes.func,
  activeSorting: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isServerError: state.error.serverError,
  offers: state.error.serverError ? [] : getVisibleOffers(state),
  locations: state.error.serverError ? [] : getCities(state),
  city: state.error.serverError ? {} : getCurrentCity(state),
  activeSorting: state.error.serverError ? `` : getActiveSorting(state),
  cityCoords: state.error.serverError ? [] : getCityCoords(state),
  cityZoom: state.error.serverError ? null : getCityZoom(state)
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
