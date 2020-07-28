import React from "react";
import PropTypes from "prop-types";

const options = [
  {
    label: `Popular`,
    value: `popular`,
  },
  {
    label: `Price: low to high`,
    value: `to-high`,
  },
  {
    label: `Price: high to low`,
    value: `to-low`,
  },
  {
    label: `Top rated first`,
    value: `top-rated`,
  }
];

class SortingOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this._onOptionClick = this._onOptionClick.bind(this);
  }

  _onOptionClick(evt) {
    const {onSortingClick} = this.props;
    onSortingClick(evt.target.value);
  }

  render() {
    return (<form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <select
        className="places__sorting-type"
        id="places-sorting"
        onChange={this._onOptionClick}
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
