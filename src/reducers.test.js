import {reducer} from "./reducer.js";
import {ActionType} from "./reducer";

const initialState = {
  city: {},
  offers: [],
};

const mockedCity = {
  location: {
    latitude: 2,
    longitude: 2,
    zoom: 2,
  },
  name: `Brussels`
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(initialState, {})).toEqual(initialState);
});

it(`Reducer should change city`, () => {
  expect(reducer(initialState, {
    type: ActionType.CHANGE_CITY,
    payload: mockedCity,
  })).toEqual({
    city: mockedCity,
    offers: [],
  });
});

it(`Reducer should change offers`, () => {
  expect(reducer(initialState, {
    type: ActionType.GET_OFFERS,
    payload: [{}, {}],
  })).toEqual({
    city: {},
    offers: [{}, {}],
  });
});
