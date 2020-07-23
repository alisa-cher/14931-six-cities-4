import React from "react";
import PropTypes from "prop-types";
import OffersList from "../offers-list/offers-list.jsx";
import Map from "../map/map.jsx";
import LocationsList from "../locations-list/locations-list.jsx";
import {cityShape} from "../../types.js";

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
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"/>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
                {/* // <!--*/}
                {/* // <select class="places__sorting-type" id="places-sorting">*/}
                {/* //   <option class="places__option" value="popular" selected="">Popular</option>*/}
                {/* //   <option class="places__option" value="to-high">Price: low to high</option>*/}
                {/* //   <option class="places__option" value="to-low">Price: high to low</option>*/}
                {/* //   <option class="places__option" value="top-rated">Top rated first</option>*/}
                {/* // </select>*/}
                {/* // -->*/}
              </form>
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

