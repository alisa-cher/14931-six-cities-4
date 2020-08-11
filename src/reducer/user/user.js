import {Operation as DataOperation} from "../data/data";
import {mapHotels} from "../../data/adapter";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userData: {}
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_USER: `SET_USER`
};

const ActionCreator = {
  setAuthStatus: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  setUser: (data) => {
    return {
      type: ActionType.SET_USER,
      payload: data,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });
    case ActionType.SET_USER:
      return Object.assign({}, state, {
        userData: action.payload,
      });
  }

  return state;
};

const Operation = {
  checkAuth: (adapter) => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.setAuthStatus(AuthorizationStatus.AUTH));
        const mappedData = adapter(response.data);
        dispatch(ActionCreator.setUser(mappedData));
        dispatch(DataOperation.getFavorites(mapHotels));
      })
      .catch(() => {
        dispatch(ActionCreator.setAuthStatus(AuthorizationStatus.NO_AUTH));
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then(() => {
        dispatch(ActionCreator.setAuthStatus(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },
};

export {reducer, ActionType, ActionCreator, AuthorizationStatus, Operation};
