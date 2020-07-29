import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  class HocClass extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeCard: null,
      };
      this._setActiveCard = this._setActiveCard.bind(this);
      this._resetActiveCard = this._resetActiveCard.bind(this);
    }

    _setActiveCard(card) {
      this.setState(() => {
        return {activeCard: card};
      });
    }

    _resetActiveCard() {
      this.setState(() => {
        return {activeCard: null};
      });
    }

    render() {
      const activeCard = this.state.activeCard;

      return <Component
        {...this.props}
        onCardHover={this._setActiveCard}
        onCardMouseLeave={this._resetActiveCard}
        activeCard={activeCard}
      />;
    }
  }

  HocClass.propTypes = {};

  return HocClass;
};

export default withActiveItem;
