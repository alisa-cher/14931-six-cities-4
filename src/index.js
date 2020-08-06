import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {createStore, applyMiddleware, compose} from "redux";
import App from "./components/app/app.jsx";
import reducer from "./reducer/reducer.js";
import {Operation as DataOperation} from "./reducer/data/data.js";
import {Operation as UserOperation} from "./reducer/user/user";
import {createAPI} from "./data/api.js";
import {mapHotels, mapUser} from "./data/adapter.js";
import {ActionCreator as AppActionCreator} from "./reducer/app/app.js";
import {ActionCreator as ErrorActionCreator} from "./reducer/errors/errors";
import {ActionCreator as DataActionCreator} from "./reducer/user/user";
import {AuthorizationStatus} from "./reducer/user/user";

const onUnauthorized = () => {
  store.dispatch(DataActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk.withExtraArgument(api))
));

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <App/>
      </Provider>,
      document.querySelector(`#root`)
  );
};

store.dispatch(UserOperation.checkAuth(mapUser));
store.dispatch(DataOperation.loadOffers(mapHotels))
  .then(() => {
    const state = store.getState();
    store.dispatch(AppActionCreator.setActiveLocation(state.data.offers[0].city));
  })
  .catch(() => store.dispatch(ErrorActionCreator.setOffersLoadError(true)))
  .then(() => init());
