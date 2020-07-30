import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {createStore, applyMiddleware, compose} from "redux";
import App from "./components/app/app.jsx";
import {reducer, Operation as DataOperation} from "./reducer.js";
import {createAPI} from "./data/api.js";

const api = createAPI();

// Не передаем изначальное состояние, так как reducer берет его из соответствующего файла
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

store.dispatch(DataOperation.getOffers());
init();
