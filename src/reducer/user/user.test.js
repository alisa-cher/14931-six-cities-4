import MockAdapter from "axios-mock-adapter";
import {reducer, ActionType, AuthorizationStatus} from "./user.js";
import {createAPI} from "../../data/api";
import {Operation} from "../user/user";

const api = createAPI(() => {});

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userData: {}
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual(initialState);
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer(initialState, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
    userData: {}
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
    userData: {}
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    userData: {}
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
    userData: {}
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
    userData: {}
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    userData: {}
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    userData: {}
  });
});

it(`Reducer should change userData by a given value`, () => {
  expect(reducer(initialState, {
    type: ActionType.SET_USER,
    payload: {name: `some user`},
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    userData: {name: `some user`}
  });
});

describe(`Operation functions correctly`, () => {
  const apiMock = new MockAdapter(api);
  const adapter = jest.fn((data) => data);
  const checkAuth = Operation.checkAuth(adapter);
  const login = Operation.login({});

  it(`Should make a correct API GET call to /login`, function () {
    const dispatch = jest.fn();

    apiMock
      .onGet(`/login`)
      .reply(200, {name: `some user`});

    return checkAuth(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_USER,
          payload: {name: `some user`},
        });
      });
  });

  it(`Should make a correct API POST call to /login`, function () {
    const dispatch = jest.fn();

    apiMock
      .onPost(`/login`)
      .reply(200);

    return login(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });
});
