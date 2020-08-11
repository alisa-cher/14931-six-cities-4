import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  class HocClass extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeItem: null,
      };
      this._handleItemSet = this._handleItemSet.bind(this);
      this._handleItemReset = this._handleItemReset.bind(this);
    }

    _handleItemSet(item) {
      this.setState(() => {
        return {activeItem: item};
      });
    }

    _handleItemReset() {
      this.setState(() => {
        return {activeItem: null};
      });
    }

    render() {
      const activeItem = this.state.activeItem;

      return <Component
        {...this.props}
        onItemSet={this._handleItemSet}
        onItemReset={this._handleItemReset}
        activeItem={activeItem}
      />;
    }
  }

  HocClass.propTypes = {};

  return HocClass;
};

export default withActiveItem;
