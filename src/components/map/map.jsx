import React from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import {detailedOfferShape, offerShape} from "../../types";

const mapConfig = {
  ICON_SIZE: [30, 30],
  TILE_URL: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
  ATTRIBUTION_URL: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
  MAP_ID: `map`,
  ICON_BASIC: `../img/pin.svg`,
  ICON_ACTIVE: `../img/pin-active.svg`,
};

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this._markers = [];
    this.markersLayer = null;
    this._map = null;
    this._icon = null;
    this.activeIcon = null;
  }

  componentDidMount() {
    const {
      offers,
      detailedOffer,
      activeCard,
      cityCoords,
      cityZoom
    } = this.props;

    this._icon = this._initIcon(mapConfig.ICON_BASIC);
    this.activeIcon = this._initIcon(mapConfig.ICON_ACTIVE);
    this._map = this._initMap(cityCoords, cityZoom);
    this._setMap(cityCoords, cityZoom, offers, detailedOffer, activeCard);
  }

  componentDidUpdate() {
    const {
      offers,
      detailedOffer,
      activeCard,
      cityCoords,
      cityZoom
    } = this.props;

    this._markers = [];
    this.markersLayer.clearLayers();
    this._setMap(cityCoords, cityZoom, offers, detailedOffer, activeCard);
  }

  _initMarker({location: {latitude, longitude}}, icon) {
    return leaflet.marker([latitude, longitude], {icon});
  }

  _setMarkers(offers, icon, detailedOffer, activeIcon, hoveredCard) {
    offers.forEach((offer) => {
      this._markers.push(this._initMarker(offer, icon));
    });

    if (hoveredCard && !detailedOffer) {
      this._markers.push(this._initMarker(hoveredCard, activeIcon));
    }
    if (detailedOffer && !hoveredCard) {
      this._markers.push(this._initMarker(detailedOffer, activeIcon));
    }
  }

  _initIcon(iconUrl) {
    return leaflet.icon({
      iconUrl,
      iconSize: mapConfig.ICON_SIZE
    });
  }

  _setMapBackground(map) {
    return leaflet
      .tileLayer(mapConfig.TILE_URL, {attribution: mapConfig.ATTRIBUTION_URL})
      .addTo(map);
  }

  _initMap(city, zoom) {
    return leaflet.map(mapConfig.MAP_ID, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
  }

  _setMap(cityCoords, cityZoom, offers, detailedOffer, hoveredCard) {
    this._map.setView(cityCoords, cityZoom);
    this._setMapBackground(this._map);
    this._setMarkers(offers, this._icon, detailedOffer, this.activeIcon, hoveredCard);
    this.markersLayer = leaflet.layerGroup(this._markers).addTo(this._map);
  }

  render() {
    return (
      <div id={mapConfig.MAP_ID} style={{height: 100 + `%`}}/>
    );
  }
}

const coordinate = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({location: PropTypes.shape(coordinate)})).isRequired,
  cityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  cityZoom: PropTypes.number.isRequired,
  activeCard: PropTypes.shape(offerShape),
  detailedOffer: PropTypes.shape(detailedOfferShape),
};

export default Map;

