import React from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

const mapSettings = {
  ICON_SIZE: [30, 30],
  TILE_URL: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
  ATTRIBUTION_URL: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
  MAP_ID: `map`,
  ICON_BASIC: `img/pin.svg`,
  ICON_ACTIVE: `img/pin-active.svg`,
};

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this._markers = [];
    this.markersLayer = null;
    this.map = null;
    this.icon = null;
    this.activeIcon = null;
  }

  _initMarker(offer, icon) {
    const {latitude, longitude} = offer.location;
    return leaflet.marker([latitude, longitude], {icon});
  }

  _setMarkers(offers, icon, activeOffer, activeIcon) {
    offers.forEach((offer) => {
      this._markers.push(this._initMarker(offer, icon));
    });
    if (activeOffer) {
      this._markers.push(this._initMarker(activeOffer, activeIcon));
    }
  }

  _initIcon(iconUrl) {
    return leaflet.icon({
      iconUrl,
      iconSize: mapSettings.ICON_SIZE
    });
  }

  _setMapBackground(map) {
    return leaflet
      .tileLayer(mapSettings.TILE_URL, {attribution: mapSettings.ATTRIBUTION_URL})
      .addTo(map);
  }

  _initMap(city, zoom) {
    return leaflet.map(mapSettings.MAP_ID, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
  }

  _setMap(cityCoords, cityZoom, offers, activeOffer) {
    this.map.setView(cityCoords, cityZoom);
    this._setMapBackground(this.map);
    this._setMarkers(offers, this.icon, activeOffer, this.activeIcon);
    this.markersLayer = leaflet.layerGroup(this._markers).addTo(this.map);
  }

  render() {
    return (
      <div id={mapSettings.MAP_ID} style={{height: 100 + `%`}}/>
    );
  }

  componentDidMount() {
    const {
      offers,
      activeOffer,
      cityCoords,
      cityZoom
    } = this.props;

    this.icon = this._initIcon(mapSettings.ICON_BASIC);
    this.activeIcon = this._initIcon(mapSettings.ICON_ACTIVE);
    this.map = this._initMap(cityCoords, cityZoom);
    this._setMap(cityCoords, cityZoom, offers, activeOffer);
  }

  componentDidUpdate() {
    const {
      offers,
      activeOffer,
      cityCoords,
      cityZoom
    } = this.props;

    this.markersLayer.clearLayers();
    this._setMap(cityCoords, cityZoom, offers, activeOffer);
  }
}

const coordinate = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({location: PropTypes.shape(coordinate)})).isRequired,
  // TODO: потом более подробно провалидировать - не будет ли при клике на пин рендериться новая детальная карточка
  activeOffer: PropTypes.object,
  cityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  cityZoom: PropTypes.number.isRequired,
};

export default Map;

