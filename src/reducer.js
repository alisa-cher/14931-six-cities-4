import {offers} from "./mocks/offers.js";
import {mapHotels} from "./data/adapter.js";

const cities = offers.map((offer) => offer.city);
const defaultLocation = cities[0];

const initialState = {
  offers,
  city: defaultLocation,
  sorting: `popular`,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
  CHANGE_SORTING: `CHANGE_SORTING`,
};

const ActionCreator = {
  setActiveLocation: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),

  setActiveSorting: (sorting) => ({
    type: ActionType.CHANGE_SORTING,
    payload: sorting
  }),

  getOffers: (array) => ({
    type: ActionType.GET_OFFERS,
    payload: array
  }),
};

const Operation = {
  getOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const mappedData = mapHotels(response.data);
        console.log(response.data, 'raw response');
        console.log(mappedData, 'mapped response');
        dispatch(ActionCreator.getOffers(mappedData));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY: return Object.assign({}, state, {
      city: action.payload
    });
    case ActionType.GET_OFFERS: return Object.assign({}, state, {
      offers: action.payload
    });
    case ActionType.CHANGE_SORTING: return Object.assign({}, state, {
      sorting: action.payload
    });
  }

  return state;
};


export {reducer, ActionType, ActionCreator, Operation};
