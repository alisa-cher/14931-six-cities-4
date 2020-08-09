import {reducer, ActionType} from "./errors.js";

const initialState = {
  offersLoadError: null,
  favoriteOffersLoadError: null,
  postReviewError: null,
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
  });
});
