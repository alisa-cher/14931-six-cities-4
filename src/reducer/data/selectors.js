import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {getActiveSorting, getChosenCityName} from "../app/selectors";

const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
};

const filterOffers = (offers, location) => {
  return offers.filter((offer) => offer.city.name === location);
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

const getCities = createSelector(
    getOffers,
    (offers) => {
      const cities = [];
      const findElement = (property) => cities.some((el) => el.name === property);
      offers.map((offer) => {
        if (!findElement(offer.city.name)) {
          cities.push(offer.city);
        }
      });
      return cities;
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

export {getCities, getVisibleOffers};
