import React from "react";
import PropTypes from "prop-types";
import SortingOptions from "../sorting-options/sorting-options.jsx";
import {cityShape} from "../../types.js";
import OffersList from "../offers-list/offers-list.jsx";
import Header from "../header/header.jsx";
import Map from "../map/map.jsx";
import LocationsList from "../locations-list/locations-list.jsx";

const MainPage = (props) => {
  const {
    isUserLoggedIn,
    userEmail,
    userPhoto,
    offers,
    locations,
    activeSorting,
    cityCoords,
    cityZoom,
    activeLocation,
    setActiveItem,
    resetActiveItem,
    onMenuClick,
    onSortingClick,
    activeItem,
    detailedOffer,
    onFavoriteButtonClick,
    onCardTitleClick
  } = props;

  const numberOfOffers = offers.length;
  const activeLocationName = activeLocation.name;

  return (
    <div className="page page--gray page--main">
      <Header
        isUserLoggedIn={isUserLoggedIn}
        email={userEmail}
        photo={userPhoto}
      />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationsList
          locations={locations}
          activeLocation={activeLocation}
          onMenuClick={onMenuClick}
        />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{numberOfOffers} places to stay in {activeLocationName}</b>
              <SortingOptions
                onSortingClick={onSortingClick}
                activeSorting={activeSorting}
              />
              <OffersList
                offers={offers}
                onCardHover={setActiveItem}
                onCardMouseLeave={resetActiveItem}
                onCardTitleClick={onCardTitleClick}
                classNamePrefix={`cities`}
                onFavoriteButtonClick={onFavoriteButtonClick}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  offers={offers}
                  cityCoords={cityCoords}
                  cityZoom={cityZoom}
                  detailedOffer={detailedOffer}
                  activeCard={activeItem}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

MainPage.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  userEmail: PropTypes.string,
  userPhoto: PropTypes.string,
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeLocation: PropTypes.shape(cityShape),
  onMenuClick: PropTypes.func.isRequired,
  onSortingClick: PropTypes.func.isRequired,
  activeSorting: PropTypes.string.isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape(cityShape)).isRequired,
  cityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  cityZoom: PropTypes.number.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  resetActiveItem: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  activeItem: PropTypes.object,
  detailedOffer: PropTypes.object
};

export default MainPage;

