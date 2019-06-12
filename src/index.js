import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {compose} from "recompose";
import leaflet from "leaflet";

import Main from "./components/main/main.jsx";
import {reducer, Operation, ActionCreator, LoadingTypes} from "./reducer";
import createApi from "./api";
import getRandomNumber from "./utils/getRandomNumber";

const handleClick = (event) => {
  console.log(`The link was clicked.`); // eslint-disable-line no-console
  event.preventDefault();
};

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
  store.dispatch(ActionCreator.changeActiveCity(getRandomNumber(5)));

  ReactDOM.render(
      <Provider store={store}>
        <Main onCardTitleClick={handleClick} leaflet={leaflet} />
      </Provider>,
      document.getElementById(`root`)
  );
};

init();
