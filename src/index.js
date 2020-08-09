import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer/reducer.js";
import {Operation as DataOperation} from "./reducer/data/data.js";
import {createAPI} from "./data/api.js";
import {mapHotels} from "./data/adapter.js";
import App from "./components/app/app.jsx";
import {ActionCreator, AuthorizationStatus, Operation as UserOperation} from "./reducer/user/user";
import {mapUser} from "./data/adapter";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
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
store.dispatch(DataOperation.loadOffers(mapHotels)).then(() => init());
