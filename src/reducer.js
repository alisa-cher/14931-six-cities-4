import {offers} from "./mocks/offers.js";

const cities = offers.map((offer) => offer.city);
const defaultLocation = cities[0];

// TODO: правильно ли в initialState помещать вычисляемое значение (defaultLocation)?
const initialState = {
  offers,
  city: defaultLocation
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
};

const ActionCreator = {
  setActiveLocation: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),

  getOffers: (array) => ({
    type: ActionType.GET_OFFERS,
    payload: array
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY: return Object.assign({}, state, {
      city: action.payload
    });
    case ActionType.GET_OFFERS: return Object.assign({}, state, {
      offers: action.payload
    });
  }

  return state;
};


export {reducer, ActionType, ActionCreator};
