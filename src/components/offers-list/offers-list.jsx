import React from "react";
import PropTypes from "prop-types";
import {offerShape} from "../../types";
import OfferCard from "../offer-card/offer-card.jsx";

const OffersList = (props) => {
  const {
    offers,
    onCardHover,
    onCardMouseLeave,
    classNamePrefix,
    onFavoriteButtonClick,
    onCardTitleClick
  } = props;

  const getClass = (prefix) => prefix ? `places__list ` + prefix + `__list` : `places__list`;

  return (<div className={getClass(classNamePrefix)}>
    {offers.map((offer, id) =>
      <OfferCard
        key={offer + id}
        onCardHover={onCardHover}
        onMouseLeave={onCardMouseLeave}
        onButtonClick={onFavoriteButtonClick}
        onCardTitleClick={onCardTitleClick}
        offer={offer}
        classNamePrefix={classNamePrefix}
      />
    )}
  </div>);
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerShape)).isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  offersMaxAmount: PropTypes.number,
  onCardHover: PropTypes.func,
  onCardMouseLeave: PropTypes.func
};

export default OffersList;
