import {reducer, ActionType} from "./app.js";

const initialState = {
  city: {},
  sorting: `popular`
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
  expect(reducer(void 0, {})).toEqual(initialState);
});

it(`Reducer should change city`, () => {
  expect(reducer(initialState, {
    type: ActionType.CHANGE_CITY,
    payload: mockedCity,
  })).toEqual({
    city: mockedCity,
    sorting: `popular`
  });
});

it(`Reducer should change active sorting`, () => {
  expect(reducer(initialState, {
    type: ActionType.CHANGE_SORTING,
    payload: `some-string`,
  })).toEqual({
    city: {},
    sorting: `some-string`
  });
});
