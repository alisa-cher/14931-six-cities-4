import React from "react";
import PropTypes from "prop-types";
import {cityShape} from "../../types.js";

class LocationsList extends React.PureComponent {
  constructor(props) {
    super(props);
    this._onItemClick = this._onItemClick.bind(this);
  }

  _onItemClick(location) {
    const {onMenuClick} = this.props;
    onMenuClick(location);
  }

  render() {
    const {locations, activeLocation} = this.props;

    return (
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {locations.map((location, id) =>
              <li className="locations__item" key={location.name + id}>
                <a onClick={() => this._onItemClick(location)}
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
  // TODO: возможно, тут тоже надо такое припилить activeLocation: PropTypes.shape(cityShape),
  activeLocation: PropTypes.object,
  onMenuClick: PropTypes.func.isRequired,
};

export default LocationsList;
