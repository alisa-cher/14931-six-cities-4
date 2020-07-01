import React from "react";
import PropTypes from "prop-types";

class OfferCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this._onCardHover = this._onCardHover.bind(this);
  }

  _onCardHover() {
    const {onCardHover, offer} = this.props;
    onCardHover(offer);
  }

  render() {
    const {offer, onCardTitleClick} = this.props;
    const {description, isPremium, photo, price, type} = offer;
    return (
      <article className="cities__place-card place-card" onMouseEnter={this._onCardHover}>
        {isPremium && <div className="place-card__mark">
          <span>Premium</span>
        </div>}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src={photo} width="260" height="200"
              alt="Place image"/>
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `80%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name" onClick={onCardTitleClick}>
            <a href="#">{description}</a>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>);
  }
}

const offerShape = {
  description: PropTypes.string.isRequired,
  isPremium: PropTypes.bool.isRequired,
  photo: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

OfferCard.propTypes = {
  offer: PropTypes.shape(offerShape).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired
};

export default OfferCard;
