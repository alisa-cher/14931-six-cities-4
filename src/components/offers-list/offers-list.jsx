import React from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";

class OffersList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: null
    };
    this._setActiveCard = this._setActiveCard.bind(this);
  }

  _setActiveCard(card) {
    this.setState(() => {
      return {activeCard: card};
    });
  }

  render() {
    const {offers, onCardTitleClick, classNamePrefix} = this.props;
    const getClass = (prefix) => prefix ? `places__list ` + prefix + `__list` : `places__list`;

    return (
      <div className={getClass(classNamePrefix)}>
        {offers.map((offer, id) =>
          <OfferCard
            key={offer + id}
            onCardTitleClick={onCardTitleClick}
            onCardHover={this._setActiveCard}
            offer={offer}
            classNamePrefix={classNamePrefix}
          />
        )}
      </div>
    );
  }
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  offersMaxAmount: PropTypes.number
};

export default OffersList;
