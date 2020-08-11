import React from "react";
import PropTypes from "prop-types";
import {offerShape, commentShape} from "../../types";
import {sliceAnArray, capitalize} from "../../helpers";
import {mapComments, mapHotels} from "../../data/adapter";
import {filterOffersById, getNearbyOffers, getComments} from "../../reducer/data/selectors";
import CommentsList from "../comments-list/comments-list.jsx";
import {Operation as DataOperation} from "../../reducer/data/data";
import {connect} from "react-redux";
import OffersList from "../offers-list/offers-list.jsx";
import ReviewForm from "../review-form/review-form.jsx";
import Map from "../map/map.jsx";
import BookmarkButton from "../bookmark-button/bookmark-button.jsx";
import Rating from "../rating/rating.jsx";
import Header from "../header/header.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";
import withToggleItem from "../../hocs/with-toggle-item/with-toggle-item.jsx";

const NEARBY_OFFERS_MAX_AMOUNT = 3;
const PHOTO_MAX_AMOUNT = 6;
const COMMENTS_MAX_AMOUNT = 10;
const ReviewFormWrapped = withActiveItem(withToggleItem(ReviewForm));

class OfferDetails extends React.PureComponent {
  componentDidMount() {
    const {
      onGetComments,
      onGetNearbyOffers,
      hotelId
    } = this.props;

    onGetComments(hotelId);
    onGetNearbyOffers(hotelId);
  }

  render() {
    const {
      offers,
      hotelId,
      userEmail,
      userPhoto,
      onFavoriteButtonClick,
      isSendReviewError,
      isUserLoggedIn,
      onSubmit,
      activeItem,
      nearbyOffers,
      comments,
      onItemSet,
      onItemReset,
      cityCoords,
      cityZoom,
      onCardTitleClick
    } = this.props;

    const offer = filterOffersById(offers, hotelId);

    const {title, description, rating, isPremium, photos, price, type, goods, host, bedrooms, maxAdults, id, isFavorite} = offer;
    const {avatar, isPro, name} = host;
    const commentsLength = comments.length;
    const offersToRender = sliceAnArray(nearbyOffers, NEARBY_OFFERS_MAX_AMOUNT);
    const photosToRender = sliceAnArray(photos, PHOTO_MAX_AMOUNT);
    const sortedComments = comments.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    const commentsToRender = sliceAnArray(sortedComments, COMMENTS_MAX_AMOUNT);

    const BookmarkButtonWrapped = withToggleItem(BookmarkButton, !isFavorite);

    return (<div className="page">
      <Header
        isUserLoggedIn={isUserLoggedIn}
        email={userEmail}
        photo={userPhoto}
      />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {photosToRender.map((photo) =>
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
                <BookmarkButtonWrapped
                  offerId={hotelId}
                  classNamePrefix={`property`}
                  isFavorite={isFavorite}
                  onButtonClick={onFavoriteButtonClick}
                  isBig={true}
                />
              </div>
              <div className="property__rating rating">
                <Rating
                  classNamePrefix={`property`}
                  rating={rating}
                  isInteger={true}
                />
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {capitalize(type)}
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
                    <img className="property__avatar user__avatar" src={`../` + avatar} width="74" height="74"
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
                <CommentsList comments={commentsToRender}/>
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
              onCardHover={onItemSet}
              onCardMouseLeave={onItemReset}
              classNamePrefix={`near-places`}
              onFavoriteButtonClick={onFavoriteButtonClick}
              onCardTitleClick={onCardTitleClick}
            />
          </section>
        </div>
      </main>
    </div>);
  }
}

OfferDetails.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerShape)).isRequired,
  nearbyOffers: PropTypes.arrayOf(PropTypes.shape(offerShape)).isRequired,
  cityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onGetComments: PropTypes.func.isRequired,
  onGetNearbyOffers: PropTypes.func.isRequired,
  hotelId: PropTypes.number.isRequired,
  cityZoom: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onItemSet: PropTypes.func.isRequired,
  onItemReset: PropTypes.func.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool,
  isSendReviewError: PropTypes.bool,
  activeItem: PropTypes.shape(offerShape),
  userEmail: PropTypes.string,
  userPhoto: PropTypes.string
};

const mapStateToProps = (state) => ({
  nearbyOffers: getNearbyOffers(state),
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGetNearbyOffers(id) {
    dispatch(DataOperation.loadNearbyOffers(id, mapHotels));
  },

  onGetComments(id) {
    dispatch(DataOperation.loadComments(id, mapComments));
  }
});

export {OfferDetails};
export default connect(mapStateToProps, mapDispatchToProps)(OfferDetails);
