import React from "react";
import PropTypes from "prop-types";
import OffersList from "../offers-list/offers-list.jsx";
import SortingOptions from "../sorting-options/sorting-options.jsx";
import Map from "../map/map.jsx";
import LocationsList from "../locations-list/locations-list.jsx";
import {cityShape} from "../../types.js";

// TOASK: нет ли тут пропс-дриллинга? вложенность два уровня. Когда стоит коннектить к стору
// что-то кроме аппа?

const MainPage = (props) => {
  const {
    offers,
    locations,
    cityCoords,
    cityZoom,
    activeLocation,
    onCardTitleClick,
    onMenuClick
  } = props;

  const numberOfOffers = offers.length;
  const activeLocationName = activeLocation.name;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
              <SortingOptions/>
              <OffersList
                offers={offers}
                onCardTitleClick={onCardTitleClick}
                classNamePrefix={`cities`}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  offers={offers}
                  cityCoords={cityCoords}
                  cityZoom={cityZoom}
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
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  activeLocation: PropTypes.shape(cityShape),
  onMenuClick: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape(cityShape)).isRequired,
  cityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  cityZoom: PropTypes.number.isRequired,
};

export default MainPage;

