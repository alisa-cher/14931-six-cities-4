import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';

class OfferCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this._onCardHover = this._onCardHover.bind(this);
    this._onCardClick = this._onCardClick.bind(this);
  }

  _onCardHover() {
    const {onCardHover, offer} = this.props;
    onCardHover(offer);
  }

  _onCardClick() {
    const {onCardTitleClick, offer} = this.props;
    // console.log(offer, 'что попало в обработчик _onCardClick, вызванный в карточке предложения');
    onCardTitleClick(offer);
  }

  render() {
    const {offer} = this.props;
    const {title, isPremium, previewPhoto, price, type} = offer;
    return (
      <article className="cities__place-card place-card" onMouseEnter={this._onCardHover}>
        {isPremium && <div className="place-card__mark">
          <span>Premium</span>
        </div>}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <Link to='/property'>
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
          <h2 className="place-card__name" onClick={this._onCardClick}>
            <Link to='/property'>
              {title}
            </Link>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>);
  }
}

const offerShape = {
  title: PropTypes.string.isRequired,
  isPremium: PropTypes.bool.isRequired,
  previewPhoto: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

OfferCard.propTypes = {
  offer: PropTypes.shape(offerShape).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired
};

export default OfferCard;
