import {reducer, ActionType} from "./errors.js";

const initialState = {
  offersLoadError: null,
  favoriteOffersLoadError: null,
  postReviewError: null,
  networkError: ``,
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual(initialState);
});

it(`Reducer should set error when offers don't load`, () => {
  expect(reducer(initialState, {
    type: ActionType.SET_OFFERS_LOAD_ERROR,
    payload: true,
  })).toEqual({
    offersLoadError: true,
    favoriteOffersLoadError: null,
    postReviewError: null,
    networkError: ``,
  });
});

it(`Reducer should set error when favorite offers don't load`, () => {
  expect(reducer(initialState, {
    type: ActionType.SET_FAVORITE_OFFERS_LOAD_ERROR,
    payload: true,
  })).toEqual({
    offersLoadError: null,
    favoriteOffersLoadError: true,
    postReviewError: null,
    networkError: ``,
  });
});

it(`Reducer should set error when user can't post a comment`, () => {
  expect(reducer(initialState, {
    type: ActionType.SET_POST_REVIEW_ERROR,
    payload: true,
  })).toEqual({
    offersLoadError: null,
    favoriteOffersLoadError: null,
    postReviewError: true,
    networkError: ``,
  });
});

it(`Reducer should set network error when server isn't available`, () => {
  expect(reducer(initialState, {
    type: ActionType.SET_NETWORK_ERROR,
    payload: true,
  })).toEqual({
    offersLoadError: null,
    favoriteOffersLoadError: null,
    postReviewError: null,
    networkError: true,
  });
});
