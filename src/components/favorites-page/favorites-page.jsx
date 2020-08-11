import React from "react";
import PropTypes from "prop-types";
import {offerShape} from "../../types";
import {DEFAULT_ERROR_MESSAGE} from "../../const";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import OffersList from "../offers-list/offers-list.jsx";
import FavoritesPlaceholder from "../favorites-placeholder/favorites-placholder.jsx";

const FavoritesPage = (props) => {
  const {
    offers,
    isUserLoggedIn,
    offersLoadError,
    userPhoto,
    userEmail,
    onFavoriteButtonClick,
    onCardTitleClick
  } = props;

  const offersListIsNotEmpty = offers.length > 0;

  return (
    <div className="page">
      <Header
        isUserLoggedIn={isUserLoggedIn}
        email={userEmail}
        photo={userPhoto}
      />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {offersListIsNotEmpty && !offersLoadError && <section className="favorites" style={{minHeight: 710 + `px`}}>
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {offers.map((offer, id) =>
                <li key={offer.city + id} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{offer.city}</span>
                      </a>
                    </div>
                  </div>
                  <OffersList
                    classNamePrefix={`favorites`}
                    offers={offer.offers}
                    onCardTitleClick={onCardTitleClick}
                    onFavoriteButtonClick={onFavoriteButtonClick}
                  />
                </li>
              )}
            </ul>
          </section>
          }
          {offersLoadError &&
            <FavoritesPlaceholder
              heading={`Error`}
              title={DEFAULT_ERROR_MESSAGE}
              description={``}
            />
          }
          {!offersListIsNotEmpty && !offersLoadError && <FavoritesPlaceholder/>}
        </div>
      </main>
      <Footer/>
    </div>
  );
};

FavoritesPage.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(
      {
        city: PropTypes.string.isRequired,
        offers: PropTypes.arrayOf(PropTypes.shape(offerShape)).isRequired
      }
  )).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  offersLoadError: PropTypes.bool,
  userEmail: PropTypes.string,
  userPhoto: PropTypes.string
};

export default FavoritesPage;

