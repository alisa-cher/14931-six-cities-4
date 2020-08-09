import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {getActiveSorting, getChosenCityName} from "../app/selectors";

const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
};

const getNearbyOffers = (state) => {
  return state[NameSpace.DATA].nearbyOffers;
};

const getComments = (state) => {
  return state[NameSpace.DATA].comments;
};

const filterOffers = (offers, location) => {
  return offers.filter((offer) => offer.city.name === location);
};

const filterOffersById = (offers, id) => {
  return offers.find((offer) => offer.id === id);
};

const getFavoriteOffers = (state) => {
  return state[NameSpace.DATA].favorites;
};

const sortOffers = (offers, activeSort) => {
  switch (activeSort) {
    case `to-high`:
      return offers.slice().sort((a, b) => (a.price > b.price) ? 1 : -1);
    case `to-low`:
      return offers.slice().sort((a, b) => (a.price < b.price) ? 1 : -1);
    case `top-rated`:
      return offers.slice().sort((a, b) => (a.rating < b.rating) ? 1 : -1);
    default:
      return offers;
  }
};

const getCities = (offers) => {
  const cities = [];
  const findElement = (property) => cities.some((el) => el.name === property);
  offers.map((offer) => {
    if (!findElement(offer.city.name)) {
      cities.push(offer.city);
    }
  });
  return cities;
};

const getAllCities = createSelector(
    getOffers,
    (offers) => getCities(offers)
);

const getFavoriteCities = createSelector(
    getFavoriteOffers,
    (offers) => getCities(offers)
);

const getFavoriteOffersGroupedByCity = createSelector(
    getFavoriteCities,
    getFavoriteOffers,
    (cities, offers) => {
      const array = [];
      cities.forEach((city) => {
        const obj = {};
        obj[`city`] = city.name;
        obj[`offers`] = filterOffers(offers, city.name);
        array.push(obj);
      });
      return array;
    }
);

const getVisibleOffers = createSelector(
    getOffers,
    getChosenCityName,
    getActiveSorting,
    (offers, city, sorting) => {
      return sortOffers(filterOffers(offers, city), sorting);
    }
);

export {
  getAllCities,
  getVisibleOffers,
  filterOffersById,
  getFavoriteOffersGroupedByCity,
  getNearbyOffers,
  getComments,
  getOffers
};
