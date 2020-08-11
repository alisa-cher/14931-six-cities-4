import React from "react";
import PropTypes from "prop-types";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AuthorizationStatus} from "../../reducer/user/user";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app.js";
import {ActionCreator as ErrorActionCreator} from "../../reducer/errors/errors.js";
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
import {DEFAULT_ERROR_MESSAGE, AppRouting} from "../../const";
import history from "../../history";
import PrivateRoute from "../private-route/private-route.jsx";
import OfferDetails from "../offer-details/offer-details.jsx";
import ErrorPage from "../error-page/error-page.jsx";
import MainPage from "../main-page/main-page.jsx";
import AuthPage from "../auth-page/auth-page.jsx";
import FavoritesPage from "../favorites-page/favorites-page.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";
import {offerShape, cityShape} from "../../types";

const MainPageWrapped = withActiveItem(MainPage);
const OfferDetailsWrapped = withActiveItem(OfferDetails);

const App = (props) => {
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
    networkError,
    login,
    cityCoords,
    cityZoom,
    onCardTitleClick,
    onCommentSend,
    isSendReviewError,
    isError,
    isFavoriteOffersLoadError,
    favoriteOffers,
    authStatus
  } = props;

  const isUserLoggedIn = (authStatus === AuthorizationStatus.AUTH);
  const offersLoaded = !!offers.length;

  const renderMainPage = () => {
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
  };

  const renderPropertyPage = (hotelId) => {
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
  };

  const renderFavoritesPage = () =>{
    return <FavoritesPage
      offers={favoriteOffers}
      isUserLoggedIn={isUserLoggedIn}
      userPhoto={userPhoto}
      userEmail={userEmail}
      offersLoadError={isFavoriteOffersLoadError}
      onFavoriteButtonClick={onFavoriteButtonClick}
      onCardTitleClick={onCardTitleClick}
    />;
  };

  const render404Page = () => {
    return <ErrorPage
      isUserLoggedIn={isUserLoggedIn}
      userEmail={userEmail}
      userPhoto={userPhoto}
      status={`404`}
      description={`Page is not found.`}
    />;
  };

  if (isError) {
    return <ErrorPage
      isUserLoggedIn={isUserLoggedIn}
      userEmail={userEmail}
      userPhoto={userPhoto}
      status={isError}
      description={DEFAULT_ERROR_MESSAGE}
    />;
  }

  return <Router history={history}>
    <Switch>
      <Route exact path={AppRouting.LOGIN}>
        <AuthPage onSubmit={login} isError={networkError}/>
        {isUserLoggedIn && <Redirect to={AppRouting.MAIN} />}
      </Route>
      <Route
        exact
        path={AppRouting.MAIN}
        render={() => {
          return (
            <React.Fragment>
              {!isError && !offersLoaded && <ErrorPage
                isUserLoggedIn={isUserLoggedIn}
                userEmail={userEmail}
                userPhoto={userPhoto}
                status={`No places to stay available.`}
                description={``}
              />}
              {!isError && renderMainPage(isUserLoggedIn)}
            </React.Fragment>
          );
        }}>
      </Route>
      <Route exact path={AppRouting.DETAILED_OFFER} render={
        (data) => {
          const hotelId = parseInt(data.match.params[`hotel_id`], 10);
          const offer = filterOffersById(offers, hotelId);
          if (offer) {
            return renderPropertyPage(hotelId);
          }
          return render404Page();
        }
      }>
      </Route>
      <PrivateRoute
        exact
        path={AppRouting.FAVORITES}
        render={() => renderFavoritesPage()}/>
      <Route
        path={AppRouting.MAIN}
        render={() => render404Page()}
      />
    </Switch>
  </Router>;
};

App.propTypes = {
  login: PropTypes.func.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  authStatus: PropTypes.string.isRequired,
  isSendReviewError: PropTypes.bool,
  isFavoriteOffersLoadError: PropTypes.bool,
  onCommentSend: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  userEmail: PropTypes.string,
  userPhoto: PropTypes.string,
  offers: PropTypes.arrayOf(PropTypes.shape(offerShape)),
  favoriteOffers: PropTypes.arrayOf(PropTypes.shape(
      {
        city: PropTypes.string.isRequired,
        offers: PropTypes.arrayOf(PropTypes.shape(offerShape)).isRequired
      }
  )),
  locations: PropTypes.arrayOf(PropTypes.shape(cityShape)),
  city: PropTypes.shape(cityShape),
  cityCoords: PropTypes.arrayOf(PropTypes.number),
  cityZoom: PropTypes.number,
  onMenuClick: PropTypes.func,
  onSortingClick: PropTypes.func,
  activeSorting: PropTypes.string,
  isError: PropTypes.string,
  networkError: PropTypes.string,
};

const mapStateToProps = (state) => ({
  networkError: state.error.networkError,
  authStatus: getAuthorisationStatus(state),
  userEmail: getUserEmail(state),
  userPhoto: getUserPhoto(state),
  isFavoriteOffersLoadError: state.error.favoriteOffersLoadError,
  isSendReviewError: state.error.postReviewError,
  offers: !state.data.offers.length ? [] : getVisibleOffers(state),
  favoriteOffers: getFavoriteOffersGroupedByCity(state),
  locations: !state.data.offers.length || state.error.offersLoadError ? [] : getAllCities(state),
  city: !state.data.offers.length || state.error.offersLoadError ? {} : getCurrentCity(state),
  activeSorting: !state.data.offers.length || state.error.offersLoadError ? `` : getActiveSorting(state),
  cityCoords: !state.data.offers.length || state.error.offersLoadError ? [] : getCityCoords(state),
  cityZoom: !state.data.offers.length || state.error.offersLoadError ? 0 : getCityZoom(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData))
      .then(() => dispatch(UserOperation.checkAuth(mapUser)))
      .catch((err) => {
        dispatch(ErrorActionCreator.setNetworkError(err.message));
      });
  },
  onCommentSend(data, id, onSend, onSuccess) {
    dispatch(DataOperation.sendComment(data, id, onSend, onSuccess))
      .then(() => dispatch(DataOperation.loadComments(id, mapComments)));
  },
  onFavoriteButtonClick(data, offerId, status) {
    dispatch(UserOperation.checkAuth(mapUser))
      .then(() => dispatch(DataOperation.changeFavoriteStatus(data, offerId, status)))
      .then(() => dispatch(DataOperation.getFavorites(mapHotels)))
      .catch(() => history.push(AppRouting.LOGIN));
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
