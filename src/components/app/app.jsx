import React from "react";
import PropTypes from "prop-types";
import {Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {AuthorizationStatus} from "../../reducer/user/user";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app.js";
import {Operation as UserOperation} from "../../reducer/user/user";
import {Operation as DataOperation} from "../../reducer/data/data";
import {
  getVisibleOffers,
  getAllCities,
  getFavoriteOffersGroupedByCity,
  filterOffersById
} from "../../reducer/data/selectors";
import {mapComments, mapHotels, mapUser} from "../../data/adapter";
import {getCityCoords, getCityZoom, getActiveSorting, getCurrentCity} from "../../reducer/app/selectors";
import {getAuthorisationStatus, getUserEmail, getUserPhoto} from "../../reducer/user/selectors";
import history from "../../history";
import PrivateRoute from "../private-route/private-route.jsx";
import OfferDetails from "../offer-details/offer-details.jsx";
import ErrorPage from "../error-page/error-page.jsx";
import MainPage from "../main-page/main-page.jsx";
import AuthPage from "../auth-page/auth-page.jsx";
import FavoritesPage from "../favorites-page/favorites-page.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";
import {offerShape} from "../../types";

const MainPageWrapped = withActiveItem(MainPage);
const OfferDetailsWrapped = withActiveItem(OfferDetails);

class App extends React.PureComponent {

  _renderMainPage(isUserLoggedIn) {
    const {
      userEmail,
      userPhoto,
      offers,
      onFavoriteButtonClick,
      onMenuClick,
      onSortingClick,
      activeSorting,
      locations,
      city,
      cityCoords,
      cityZoom,
      onCardTitleClick
    } = this.props;

    return <MainPageWrapped
      isUserLoggedIn={isUserLoggedIn}
      userEmail={userEmail}
      userPhoto={userPhoto}
      offers={offers}
      locations={locations}
      activeLocation={city}
      onFavoriteButtonClick={onFavoriteButtonClick}
      onMenuClick={onMenuClick}
      onSortingClick={onSortingClick}
      activeSorting={activeSorting}
      cityCoords={cityCoords}
      cityZoom={cityZoom}
      onCardTitleClick={onCardTitleClick}
    />;
  }

  _renderPropertyPage(isUserLoggedIn, hotelId) {
    const {
      userEmail,
      userPhoto,
      offers,
      cityCoords,
      cityZoom,
      onCommentSend,
      onFavoriteButtonClick,
      onCardTitleClick,
      isSendReviewError
    } = this.props;

    return <OfferDetailsWrapped
      isUserLoggedIn={isUserLoggedIn}
      userEmail={userEmail}
      userPhoto={userPhoto}
      onSubmit={onCommentSend}
      onCardTitleClick={onCardTitleClick}
      onFavoriteButtonClick={onFavoriteButtonClick}
      offers={offers}
      hotelId={hotelId}
      cityCoords={cityCoords}
      cityZoom={cityZoom}
      isSendReviewError={isSendReviewError}
    />;
  }

  _render404Page(isUserLoggedIn) {
    const {
      userEmail,
      userPhoto
    } = this.props;

    return <ErrorPage
      isUserLoggedIn={isUserLoggedIn}
      userEmail={userEmail}
      userPhoto={userPhoto}
      status={`404`}
      description={`Page is not found.`}
    />;
  }

  render() {

    const {
      login,
      authStatus,
      userEmail,
      userPhoto,
      offers,
      isOffersLoadError,
      isFavoriteOffersLoadError,
      onFavoriteButtonClick,
      favoriteOffers,
      onCardTitleClick
    } = this.props;

    const isUserLoggedIn = (authStatus === AuthorizationStatus.AUTH);
    const offersLoaded = !!offers.length;

    return <Router history={history}>
      <Switch>
        <Route exact path="/login">
          <AuthPage onSubmit={login}/>
        </Route>
        <Route
          exact
          path={`/`}
          render={() => {
            return (
              <React.Fragment>
                {!isOffersLoadError && this._renderMainPage(isUserLoggedIn)}
                {isOffersLoadError && <ErrorPage
                  isUserLoggedIn={isUserLoggedIn}
                  userEmail={userEmail}
                  userPhoto={userPhoto}
                  status={`Something went wrong. Please try again later.`}
                  description={``}
                />}
                {!offersLoaded && <ErrorPage
                  isUserLoggedIn={isUserLoggedIn}
                  userEmail={userEmail}
                  userPhoto={userPhoto}
                />}
              </React.Fragment>
            );
          }}>
        </Route>
        <Route exact path="/offer/:hotel_id/" render={
          (data) => {
            const hotelId = parseInt(data.match.params[`hotel_id`], 10);
            const offer = filterOffersById(offers, hotelId);
            if (offer) {
              return this._renderPropertyPage(isUserLoggedIn, hotelId);
            }
            return this._render404Page(isUserLoggedIn);
          }
        }>
        </Route>
        <PrivateRoute
          exact
          path={`/favorites`}
          render={() => {
            return (
              <FavoritesPage
                offers={favoriteOffers}
                isUserLoggedIn={isUserLoggedIn}
                userPhoto={userPhoto}
                userEmail={userEmail}
                offersLoadError={isFavoriteOffersLoadError}
                onFavoriteButtonClick={onFavoriteButtonClick}
                onCardTitleClick={onCardTitleClick}
              />
            );
          }}/>
        <Route path={`/`} render={() => this._render404Page(isUserLoggedIn)}/>
      </Switch>
    </Router>;
  }
}

App.propTypes = {
  login: PropTypes.func.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  authStatus: PropTypes.string.isRequired,
  isSendReviewError: PropTypes.bool,
  isOffersLoadError: PropTypes.bool,
  isFavoriteOffersLoadError: PropTypes.bool,
  onCommentSend: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  userEmail: PropTypes.string,
  userPhoto: PropTypes.string,
  user: PropTypes.object,
  offers: PropTypes.arrayOf(PropTypes.object),
  favoriteOffers: PropTypes.arrayOf(PropTypes.shape(
      {
        city: PropTypes.string.isRequired,
        offers: PropTypes.arrayOf(PropTypes.shape(offerShape)).isRequired
      }
  )),
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
  isFavoriteOffersLoadError: state.error.favoriteOffersLoadError,
  isSendReviewError: state.error.postReviewError,
  offers: state.error.offersLoadError ? [] : getVisibleOffers(state),
  favoriteOffers: getFavoriteOffersGroupedByCity(state),
  locations: state.error.offersLoadError ? [] : getAllCities(state),
  city: state.error.offersLoadError ? {} : getCurrentCity(state),
  activeSorting: state.error.offersLoadError ? `` : getActiveSorting(state),
  cityCoords: state.error.offersLoadError ? [] : getCityCoords(state),
  cityZoom: state.error.offersLoadError ? null : getCityZoom(state)
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData))
      .then(() => dispatch(UserOperation.checkAuth(mapUser)))
      .then(() => history.push(`/favorites`));
  },
  onCommentSend(data, id, onSend, onSuccess) {
    dispatch(DataOperation.sendComment(data, id, onSend, onSuccess))
      .then(() => dispatch(DataOperation.loadComments(id, mapComments)));
  },
  onFavoriteButtonClick(data, offerId, status) {
    dispatch(UserOperation.checkAuth(mapUser))
      .then(() => dispatch(DataOperation.changeFavoriteStatus(data, offerId, status)))
      .then(() => dispatch(DataOperation.getFavorites(mapHotels)))
      .catch(() => history.push(`/login`));
  },
  onMenuClick(location) {
    dispatch(AppActionCreator.setActiveLocation(location));
  },
  onSortingClick(option) {
    dispatch(AppActionCreator.setActiveSorting(option));
  },
  onCardTitleClick(id) {
    dispatch(DataOperation.loadComments(id, mapComments));
    dispatch(DataOperation.loadNearbyOffers(id, mapHotels));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
