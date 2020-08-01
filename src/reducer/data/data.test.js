import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../data/api";
import {reducer, ActionType, Operation} from "./data.js";

const api = createAPI(() => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    offers: [],
  });
});

it(`Reducer should update offers by loaded offers`, () => {
  expect(reducer({
    offers: [],
  }, {
    type: ActionType.GET_OFFERS,
    payload: [{}, {}],
  })).toEqual({
    offers: [{}, {}]
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const adapter = jest.fn((data) => data);
    const offersLoader = Operation.loadOffers(adapter);

    apiMock
      .onGet(`/hotels`)
      .reply(200, [{fake: true}]);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_OFFERS,
          payload: [{fake: true}],
        });
      });
  });
});
