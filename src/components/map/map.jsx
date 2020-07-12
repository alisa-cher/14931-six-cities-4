import React from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _setMarkers(offers, map, icon) {
    offers.forEach((offer) => {
      leaflet
        .marker([offer.location.latitude, offer.location.longitude], {icon})
        .addTo(map);
    });
  }

  _initIcon() {
    return leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });
  }

  _setMapBackground(map) {
    return leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);
  }

  _setMap(city, zoom) {
    return leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
  }

  render() {
    return (
      <div id="map" style={{height: 100 + `%`}}></div>
    );
  }

  componentDidMount() {
    const {offers} = this.props;
    const city = [52.38333, 4.9];
    const icon = this._initIcon();
    const zoom = 12;
    const map = this._setMap(city, zoom);
    map.setView(city, zoom);
    this._setMapBackground(map);
    this._setMarkers(offers, map, icon);
  }
}

const coordinate = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({location: PropTypes.shape(coordinate)})).isRequired
};

export default Map;

