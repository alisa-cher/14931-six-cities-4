import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  class HocClass extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeItem: null,
      };
      this._setActiveItem = this._setActiveItem.bind(this);
      this._resetActiveItem = this._resetActiveItem.bind(this);
    }

    _setActiveItem(item) {
      this.setState(() => {
        return {activeItem: item};
      });
    }

    _resetActiveItem() {
      this.setState(() => {
        return {activeItem: null};
      });
    }

    render() {
      const activeItem = this.state.activeItem;

      return <Component
        {...this.props}
        setActiveItem={this._setActiveItem}
        resetActiveItem={this._resetActiveItem}
        activeItem={activeItem}
      />;
    }
  }

  HocClass.propTypes = {};

  return HocClass;
};

export default withActiveItem;
