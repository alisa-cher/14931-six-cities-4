import React from "react";
import PropTypes from "prop-types";
import {cityShape} from "../../types.js";

class LocationsList extends React.PureComponent {
  constructor(props) {
    super(props);
    this._handleItemClick = this._handleItemClick.bind(this);
  }

  _handleItemClick(location) {
    const {onMenuClick} = this.props;
    onMenuClick(location);
  }

  render() {
    const {locations, activeLocation} = this.props;

    return (
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {locations.map((location, index) =>
              <li className="locations__item" key={location.name + index}>
                <a onClick={() => this._handleItemClick(location)}
                  className={(location.name === activeLocation.name) ? `tabs__item--active locations__item-link tabs__item` : `locations__item-link tabs__item`}>
                  <span>{location.name}</span>
                </a>
              </li>
            )}
          </ul>
        </section>
      </div>
    );
  }
}

LocationsList.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape(cityShape)),
  activeLocation: PropTypes.shape(cityShape),
  onMenuClick: PropTypes.func.isRequired,
};

export default LocationsList;
