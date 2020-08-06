import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app/app.js";
import MainPage from "../main/main.jsx";
import AuthPage from "../authorisation/auth.jsx";
import OfferDetails from "../offer-details/offer-details.jsx";
import comments from "../../mocks/comments";
import {getVisibleOffers, getCities} from "../../reducer/data/selectors";
import {getCityCoords, getCityZoom, getActiveSorting, getCurrentCity} from "../../reducer/app/selectors";
import {getAuthorisationStatus, getUserEmail, getUserPhoto} from "../../reducer/user/selectors";
import {Operation as UserOperation} from "../../reducer/user/user";
import {Operation as DataOperation} from "../../reducer/data/data";

import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";
import {AuthorizationStatus} from "../../reducer/user/user";

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

  _renderMainPage(isUserLoggedIn, detailedOffer) {
    const {
      userEmail,
      userPhoto,
      offers,
      onMenuClick,
      onSortingClick,
      activeSorting,
      locations,
      city,
      cityCoords,
      cityZoom
    } = this.props;

    return <MainPageWrapped
      isUserLoggedIn={isUserLoggedIn}
      userEmail={userEmail}
      userPhoto={userPhoto}
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
    />;
  }

  _renderPropertyPage(isUserLoggedIn, detailedOffer) {
    const {
      offers,
      cityCoords,
      cityZoom,
      sendComment,
      isSendReviewError
    } = this.props;

    return <OfferDetailsWrapped
      isUserLoggedIn={isUserLoggedIn}
      onSubmit={sendComment}
      offer={detailedOffer}
      nearbyOffers={offers}
      comments={comments}
      onCardTitleClick={this._setDetailedOffer}
      cityCoords={cityCoords}
      cityZoom={cityZoom}
      isSendReviewError={isSendReviewError}/>;
  }

  render() {
    const detailedOffer = this.state.detailedOffer;

    const {
      login,
      authStatus,
      isOffersLoadError
    } = this.props;

    const isUserLoggedIn = (authStatus === AuthorizationStatus.AUTH);

    return <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          {!isUserLoggedIn && <AuthPage onSubmit={login}/>}
          {isUserLoggedIn && !isOffersLoadError && this._renderMainPage(isUserLoggedIn, detailedOffer)}
        </Route>
        <Route exact path="/">
          {isOffersLoadError && <div> Placeholder for screen announcing an error to the user.</div>}
          {!isOffersLoadError && this._renderMainPage(isUserLoggedIn, detailedOffer)}
        </Route>
        <Route exact path="/property">
          {detailedOffer && this._renderPropertyPage(isUserLoggedIn, detailedOffer)}
        </Route>
      </Switch>
    </BrowserRouter>;
  }
}

App.propTypes = {
  login: PropTypes.func.isRequired,
  authStatus: PropTypes.string.isRequired,
  isSendReviewError: PropTypes.bool,
  isOffersLoadError: PropTypes.bool,
  sendComment: PropTypes.func.isRequired,
  userEmail: PropTypes.string,
  userPhoto: PropTypes.string,
  user: PropTypes.object,
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
  authStatus: getAuthorisationStatus(state),
  userEmail: getUserEmail(state),
  userPhoto: getUserPhoto(state),
  isOffersLoadError: state.error.offersLoadError,
  isSendReviewError: state.error.postReviewError,
  offers: state.error.offersLoadError ? [] : getVisibleOffers(state),
  locations: state.error.offersLoadError ? [] : getCities(state),
  city: state.error.offersLoadError ? {} : getCurrentCity(state),
  activeSorting: state.error.offersLoadError ? `` : getActiveSorting(state),
  cityCoords: state.error.offersLoadError ? [] : getCityCoords(state),
  cityZoom: state.error.offersLoadError ? null : getCityZoom(state)
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  sendComment(data, id, onSend, onSuccess) {
    dispatch(DataOperation.sendComment(data, id, onSend, onSuccess));
  },
  onMenuClick(location) {
    dispatch(ActionCreator.setActiveLocation(location));
  },
  onSortingClick(option) {
    dispatch(ActionCreator.setActiveSorting(option));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
