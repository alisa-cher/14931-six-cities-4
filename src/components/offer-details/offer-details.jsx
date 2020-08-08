import React from "react";
import PropTypes from "prop-types";
import CommentsList from "../comments-list/comments-list.jsx";
import OffersList from "../offers-list/offers-list.jsx";
import ReviewForm from "../review-form/review-form.jsx";
import Map from "../map/map.jsx";
import {sliceAnArray} from "../../helpers.js";
import {detailedOfferShape, offerShape} from "../../types.js";
import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";
import withToggleItem from "../../hocs/with-toggle-item/with-toggle-item.jsx";

const ReviewFormWrapped = withToggleItem(withActiveItem(ReviewForm));

const OfferDetails = (props) => {
  const {
    isSendReviewError,
    isUserLoggedIn,
    onSubmit,
    offer,
    activeItem,
    nearbyOffers,
    comments,
    onCardTitleClick,
    setActiveItem,
    resetActiveItem,
    cityCoords,
    cityZoom
  } = props;

  const {title, description, rating, isPremium, photos, price, type, goods, host, bedrooms, maxAdults, id} = offer;
  const {avatar, isPro, name} = host;
  const commentsLength = comments.length;
  const NEARBY_OFFERS_MAX_AMOUNT = 3;
  const COMMENTS_MAX_AMOUNT = 10;
  const offersToRender = sliceAnArray(nearbyOffers, NEARBY_OFFERS_MAX_AMOUNT);
  const commentsToRender = sliceAnArray(comments, COMMENTS_MAX_AMOUNT);
  const sortedComments = commentsToRender.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
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
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {photos.map((photo) =>
                <div className="property__image-wrapper" key={photo}>
                  <img className="property__image" src={photo} alt="Photo studio"/>
                </div>
              )}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && <div className="property__mark">
                <span>Premium</span>
              </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `80%`}}/>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms > 1 ? bedrooms + ` Bedrooms` : bedrooms + ` Bedroom`}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults > 1 ? maxAdults + ` adults` : maxAdults + ` adult`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((item) =>
                    <li key={item} className="property__inside-item">
                      {item}
                    </li>
                  )}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${isPro ? `` : `property__avatar-wrapper--pro`}`}>
                    <img className="property__avatar user__avatar" src={avatar} width="74" height="74"
                      alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{commentsLength}</span></h2>
                <CommentsList comments={sortedComments}/>
                {isUserLoggedIn &&
                  <ReviewFormWrapped
                    onSubmit={onSubmit}
                    offerId={id}
                    isError={isSendReviewError}
                  />}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              offers={offersToRender}
              detailedOffer={offer}
              activeCard={activeItem}
              cityCoords={cityCoords}
              cityZoom={cityZoom}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList
              offers={offersToRender}
              onCardTitleClick={onCardTitleClick}
              onCardHover={setActiveItem}
              onCardMouseLeave={resetActiveItem}
              classNamePrefix={`near-places`}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

OfferDetails.propTypes = {
  isUserLoggedIn: PropTypes.bool,
  isSendReviewError: PropTypes.bool,
  offer: PropTypes.shape(detailedOfferShape).isRequired,
  activeItem: PropTypes.object,
  nearbyOffers: PropTypes.arrayOf(PropTypes.shape(offerShape)).isRequired,
  comments: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  cityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  cityZoom: PropTypes.number.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  resetActiveItem: PropTypes.func.isRequired
};

export default OfferDetails;
