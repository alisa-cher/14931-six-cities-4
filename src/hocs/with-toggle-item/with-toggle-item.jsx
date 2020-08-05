import React, {PureComponent} from 'react';

const withToggleItem = (Component) => {
  class HocClass extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isDisabled: true,
      };
      this._toggleItem = this._toggleItem.bind(this);
    }

    _toggleItem() {
      this.setState((previousState) => {
        return {isDisabled: !previousState.isDisabled};
      });
    }

    render() {
      const isDisabled = this.state.isDisabled;

      return <Component
        {...this.props}
        toggleItem={this._toggleItem}
        disabledItem={isDisabled}
      />;
    }
  }

  HocClass.propTypes = {};

  return HocClass;
};

export default withToggleItem;
