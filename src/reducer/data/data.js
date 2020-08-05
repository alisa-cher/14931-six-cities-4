import {AuthorizationStatus} from "../user/user";

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
    return api.post(`/comments/{offerId}`, data)
      .then(() => {
        onSuccess();
        // dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },
};

export {reducer, ActionType, ActionCreator, Operation};
