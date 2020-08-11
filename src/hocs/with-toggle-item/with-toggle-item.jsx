import React, {PureComponent} from 'react';

const withToggleItem = (Component, initialValue = true) => {
  class HocClass extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isDisabled: initialValue,
      };
      this._handleItemToggle = this._handleItemToggle.bind(this);
    }

    _handleItemToggle(bool) {
      this.setState(() => {
        return {isDisabled: bool};
      });
    }

    render() {
      const isDisabled = this.state.isDisabled;

      return <Component
        {...this.props}
        onItemToggle={this._handleItemToggle}
        disabledItem={isDisabled}
      />;
    }
  }

  HocClass.propTypes = {};

  return HocClass;
};

export default withToggleItem;
