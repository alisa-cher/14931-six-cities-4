import {AuthorizationStatus} from "../user/user";
import {ActionCreator as ErrorActionCreator} from "../errors/errors";

const initialState = {
  offers: []
};

const ActionType = {
  GET_OFFERS: `GET_OFFERS`
};

const ActionCreator = {
  getOffers: (array) => ({
    type: ActionType.GET_OFFERS,
    payload: array
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_OFFERS: return Object.assign({}, state, {
      offers: action.payload
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
      });
  },

  loadComments: (adapter) => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const mappedData = adapter(response.data);
        dispatch(ActionCreator.getOffers(mappedData));
      });
  },

  sendComment: (data, offerId, onSend, onSuccess) => (dispatch, getState, api) => {
    onSend();
    return api.post(`/comment/${offerId}`, data)
      .then(() => {
        onSuccess();
        // dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((error) => {
        dispatch(ErrorActionCreator.setError(true));
        console.log(error.response.data);
        console.log(error.response);
        console.log(error.response.headers);
        throw err;
      });
  },
};

export {reducer, ActionType, ActionCreator, Operation};
