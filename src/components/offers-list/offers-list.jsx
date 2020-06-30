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
    const {offers, onCardTitleClick} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer, id) =>
          <OfferCard
            key={offer + id}
            onCardTitleClick={onCardTitleClick}
            onCardHover={this._setActiveCard}
            offer={offer}
          />
        )}
      </div>
    );
  }
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
};

export default OffersList;
