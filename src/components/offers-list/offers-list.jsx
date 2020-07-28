import React from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";

const OffersList = (props) => {
  const {
    offers,
    onCardTitleClick,
    onCardHover,
    onCardMouseLeave,
    classNamePrefix
  } = props;

  const getClass = (prefix) => prefix ? `places__list ` + prefix + `__list` : `places__list`;

  return (<div className={getClass(classNamePrefix)}>
    {offers.map((offer, id) =>
      <OfferCard
        key={offer + id}
        onCardTitleClick={onCardTitleClick}
        onCardHover={onCardHover}
        onMouseLeave={onCardMouseLeave}
        offer={offer}
        classNamePrefix={classNamePrefix}
      />
    )}
  </div>);
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  offersMaxAmount: PropTypes.number,
  onCardHover: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired
};

export default OffersList;
