import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import App from "./components/app/app.jsx";
import {reducer, Operation, ActionCreator, LoadingTypes} from "./reducer";
import createApi from "./api";
import history from "./history";
import {CITIES_QUANTITY} from "./constants";
import getRandomNumber from "./utils/get-random-number";

const init = () => {
  const api = createApi((...args) => store.dispatch(...args));

  const store = createStore(
      reducer,
      composeWithDevTools(
          applyMiddleware(thunk.withExtraArgument(api))
      )
  );

  store.dispatch(ActionCreator.startLoading(LoadingTypes.START_LOADING));
  store.dispatch(Operation.loadOffers());
  store.dispatch(Operation.getAuthorization());
  store.dispatch(
      ActionCreator.changeActiveCity(getRandomNumber(CITIES_QUANTITY - 1))
  );

  ReactDOM.render(
      <Provider store={store}>
        // eslint-disable-next-line no-undef
        <Router history={history} basename={process.env.PUBLIC_URL}>
          <App />
        </Router>
      </Provider>,
      document.getElementById(`root`)
  );
};

init();
