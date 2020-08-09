const initialState = {
  offersLoadError: null,
  favoriteOffersLoadError: null,
  postReviewError: null,
};

const ActionType = {
  SET_OFFERS_LOAD_ERROR: `SET_ERROR`,
  SET_FAVORITE_OFFERS_LOAD_ERROR: `SET_FAVORITE_OFFERS_LOAD_ERROR`,
  SET_POST_REVIEW_ERROR: `SET_POST_REVIEW_ERROR`,
};

const ActionCreator = {
  setOffersLoadError: (error) => ({
    type: ActionType.SET_OFFERS_LOAD_ERROR,
    payload: error
  }),

  setFavoriteOffersLoadError: (error) => ({
    type: ActionType.SET_FAVORITE_OFFERS_LOAD_ERROR,
    payload: error
  }),

  setReviewPostError: (error) => ({
    type: ActionType.SET_POST_REVIEW_ERROR,
    payload: error
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_OFFERS_LOAD_ERROR: return Object.assign({}, state, {
      offersLoadError: action.payload
    });
    case ActionType.SET_FAVORITE_OFFERS_LOAD_ERROR: return Object.assign({}, state, {
      favoriteOffersLoadError: action.payload
    });
    case ActionType.SET_POST_REVIEW_ERROR: return Object.assign({}, state, {
      postReviewError: action.payload
    });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
