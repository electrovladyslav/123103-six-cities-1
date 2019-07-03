import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {compose} from "recompose";

import App from "./components/app/app.jsx";
import {reducer, Operation, ActionCreator, LoadingTypes} from "./reducer";
import createApi from "./api";
import getRandomNumber from "./utils/get-random-number";

const init = () => {
  const api = createApi((...args) => store.dispatch(...args));

  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      )
  );

  store.dispatch(ActionCreator.startLoading(LoadingTypes.START_LOADING));
  store.dispatch(Operation.loadOffers());
  store.dispatch(Operation.getAuthorization());
  store.dispatch(ActionCreator.changeActiveCity(getRandomNumber(5)));


  ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById(`root`)
  );
};

init();
