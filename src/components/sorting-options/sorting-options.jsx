import React from "react";
import PropTypes from "prop-types";
import {SortingLabel, SortingValue} from "../../const.js";

const options = [
  {
    label: SortingLabel.POPULAR,
    value: SortingValue.POPULAR,
  },
  {
    label: SortingLabel.TO_HIGH,
    value: SortingValue.TO_HIGH,
  },
  {
    label: SortingLabel.TO_LOW,
    value: SortingValue.TO_LOW,
  },
  {
    label: SortingLabel.TOP_RATED,
    value: SortingValue.TOP_RATED,
  }
];

class SortingOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this._handleOptionClick = this._handleOptionClick.bind(this);
  }

  _handleOptionClick(evt) {
    const {onSortingClick} = this.props;
    onSortingClick(evt.target.value);
  }

  render() {
    return (<form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <select
        className="places__sorting-type"
        id="places-sorting"
        onChange={this._handleOptionClick}
      >
        {options.map((option) =>
          <option key={option.value}
            defaultValue={`popular`}
            className="places__option"
            value={option.value}>
            {option.label}
          </option>)
        }
      </select>
    </form>
    );
  }
}

SortingOptions.propTypes = {
  onSortingClick: PropTypes.func.isRequired,
  activeSorting: PropTypes.string.isRequired,
};


export default SortingOptions;
