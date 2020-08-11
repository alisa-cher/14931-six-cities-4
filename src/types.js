import PropTypes from "prop-types";

const cityShape = {
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired
  }).isRequired,
  name: PropTypes.string.isRequired
};

const offerShape = {
  title: PropTypes.string.isRequired,
  isPremium: PropTypes.bool.isRequired,
  previewPhoto: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

const hostShape = {
  avatar: PropTypes.string.isRequired,
  isPro: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

const detailedOfferShape = Object.assign({}, offerShape, {
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string).isRequired,
  host: PropTypes.shape(hostShape).isRequired,
});

const commentShape = {
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
};

export {cityShape, offerShape, detailedOfferShape, commentShape};
