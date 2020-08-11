import {ActionCreator as ErrorActionCreator} from "../errors/errors";
import {ActionCreator as AppActionCreator} from "../app/app";
import {getOffers} from "./selectors";

const initialState = {
  offers: [],
  favorites: [],
  comments: [],
  nearbyOffers: []
};

const ActionType = {
  GET_OFFERS: `GET_OFFERS`,
  GET_NEARBY_OFFERS: `GET_NEARBY_OFFERS`,
  GET_FAVORITES: `GET_FAVORITES`,
  GET_COMMENTS: `GET_COMMENTS`
};

const ActionCreator = {
  getOffers: (array) => ({
    type: ActionType.GET_OFFERS,
    payload: array
  }),

  getNearbyOffers: (array) => ({
    type: ActionType.GET_NEARBY_OFFERS,
    payload: array
  }),

  getFavorites: (array) => ({
    type: ActionType.GET_FAVORITES,
    payload: array
  }),

  getComments: (array) => ({
    type: ActionType.GET_COMMENTS,
    payload: array
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_OFFERS: return Object.assign({}, state, {
      offers: action.payload
    });
    case ActionType.GET_NEARBY_OFFERS: return Object.assign({}, state, {
      nearbyOffers: action.payload
    });
    case ActionType.GET_FAVORITES: return Object.assign({}, state, {
      favorites: action.payload
    });
    case ActionType.GET_COMMENTS: return Object.assign({}, state, {
      comments: action.payload
    });
  }

  return state;
};

const Operation = {
  loadOffers: (adapter) => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const mappedData = adapter(response.data);
        dispatch(ActionCreator.getOffers(mappedData));
        const state = getState();
        dispatch(AppActionCreator.setActiveLocation(state.data.offers[0].city));
      })
      .catch((error) => {
        dispatch(ErrorActionCreator.setOffersLoadError(error));
        throw error;
      });
  },

  loadNearbyOffers: (offerId, adapter) => (dispatch, getState, api) => {
    return api.get(`/hotels/${offerId}/nearby`)
      .then((response) => {
        const mappedData = adapter(response.data);
        dispatch(ActionCreator.getNearbyOffers(mappedData));
      });
  },

  loadComments: (offerId, adapter) => (dispatch, getState, api) => {
    return api.get(`/comments/${offerId}`)
      .then((response) => {
        const mappedData = adapter(response.data);
        dispatch(ActionCreator.getComments(mappedData));
      });
  },

  sendComment: (data, offerId, onSend, onSuccess) => (dispatch, getState, api) => {
    onSend();
    return api.post(`/comments/${offerId}`, data)
      .then(() => {
        onSuccess();
        dispatch(ErrorActionCreator.setReviewPostError(false));
      })
      .catch(() => {
        dispatch(ErrorActionCreator.setReviewPostError(true));
      });
  },

  changeFavoriteStatus: (offerId, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${offerId}/${status}`)
      .then(() => {
        const state = getState();

        const updateData = (data) => {
          const index = data.findIndex((element) => element.id === offerId);
          const copiedArr = data.slice();
          copiedArr[index].isFavorite = !!status;
          return copiedArr;
        };

        const offers = updateData(getOffers(state));
        dispatch(ActionCreator.getOffers(offers));
      })
      .catch((error) => {
        throw error;
      });
  },

  getFavorites: (adapter) => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        const mappedData = adapter(response.data);
        dispatch(ActionCreator.getFavorites(mappedData));
      })
      .catch(() => {
        dispatch(ErrorActionCreator.setFavoriteOffersLoadError(true));
      });
  },
};


export {reducer, ActionType, ActionCreator, Operation};
