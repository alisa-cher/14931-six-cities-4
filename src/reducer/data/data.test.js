import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../data/api";
import {reducer, ActionType, Operation} from "./data.js";

const api = createAPI(() => {});

const initialState = {
  offers: [],
  favorites: [],
  comments: [],
  nearbyOffers: []
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual(initialState);
});

it(`Reducer should update offers`, () => {
  expect(reducer(initialState, {
    type: ActionType.GET_OFFERS,
    payload: [{}, {}],
  })).toEqual({
    offers: [{}, {}],
    favorites: [],
    comments: [],
    nearbyOffers: []
  });
});

it(`Reducer should update favorite offers`, () => {
  expect(reducer(initialState, {
    type: ActionType.GET_FAVORITES,
    payload: [{}, {}],
  })).toEqual({
    offers: [],
    favorites: [{}, {}],
    comments: [],
    nearbyOffers: []
  });
});

it(`Reducer should update nearby offers`, () => {
  expect(reducer(initialState, {
    type: ActionType.GET_NEARBY_OFFERS,
    payload: [{}, {}],
  })).toEqual({
    offers: [],
    favorites: [],
    comments: [],
    nearbyOffers: [{}, {}]
  });
});

it(`Reducer should update comments`, () => {
  expect(reducer(initialState, {
    type: ActionType.GET_COMMENTS,
    payload: [{}, {}],
  })).toEqual({
    offers: [],
    favorites: [],
    comments: [{}, {}],
    nearbyOffers: []
  });
});

describe(`Operation functions correctly`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const adapter = jest.fn((data) => data);
    const offersLoader = Operation.loadOffers(adapter);

    apiMock
      .onGet(`/hotels`)
      .reply(200, [{fake: true}]);

    return offersLoader(dispatch, () => {
      return {
        data: {
          offers: [{city: `Amsterdam`}]
        }
      };
    }, api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_OFFERS,
          payload: [{fake: true}],
        });
      });
  });
});
