import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import {offerShape} from "../../types.js";
import {capitalize} from "../../helpers";
import BookmarkButton from "../bookmark-button/bookmark-button.jsx";
import Rating from "../rating/rating.jsx";
import withToggleItem from "../../hocs/with-toggle-item/with-toggle-item.jsx";

class OfferCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this._handleCardHover = this._handleCardHover.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
    this._handleCardClick = this._handleCardClick.bind(this);
  }

  _handleCardHover() {
    const {onCardHover, offer} = this.props;
    if (onCardHover) {
      onCardHover(offer);
    }
  }

  _handleMouseLeave() {
    const {onMouseLeave} = this.props;
    if (onMouseLeave) {
      onMouseLeave();
    }
  }

  _handleCardClick() {
    const {onCardTitleClick, offer} = this.props;
    const {id} = offer;

    onCardTitleClick(id);
  }

  render() {
    const {offer, classNamePrefix, onButtonClick} = this.props;
    const {title, isPremium, previewPhoto, price, type, id, isFavorite, rating} = offer;
    const getClass = (prefix) => prefix ? `place-card ` + prefix + `__card` : `place-card`;
    const BookmarkButtonWrapped = withToggleItem(BookmarkButton, !isFavorite);

    return (
      <article
        onMouseEnter={this._handleCardHover}
        onMouseLeave={this._handleMouseLeave}
        className={getClass(classNamePrefix)}>
        {isPremium && <div className="place-card__mark">
          <span>Premium</span>
        </div>}
        <div className={classNamePrefix + `__image-wrapper place-card__image-wrapper`}>
          <Link to={`/offer/` + id}>
            <img className="place-card__image" src={previewPhoto} width="260" height="200"
              alt="Place image"/>
          </Link>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <BookmarkButtonWrapped
              classNamePrefix={`place-card`}
              isFavorite={isFavorite}
              offerId={id}
              onButtonClick={onButtonClick}
            />
          </div>
          <div className="place-card__rating rating">
            <Rating
              classNamePrefix={`place-card`}
              rating={rating}
              isInteger={true}
            />
          </div>
          <h2 className="place-card__name" onClick={this._handleCardClick}>
            <Link to={`/offer/` + id}>{title}</Link>
          </h2>
          <p className="place-card__type">{capitalize(type)}</p>
        </div>
      </article>);
  }
}

OfferCard.propTypes = {
  offer: PropTypes.shape(offerShape).isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func,
  onMouseLeave: PropTypes.func
};

export default OfferCard;
