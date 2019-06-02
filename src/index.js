import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {compose} from "recompose";
import leaflet from "leaflet";

import Main from "./components/main/main.jsx";
import {reducer, Operation} from "./reducer";
import createApi from "./api";

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

  store.dispatch(Operation.loadOffers());

  ReactDOM.render(
      <Provider store={store}>
        <Main onCardTitleClick={handleClick} leaflet={leaflet} />
      </Provider>,
      document.getElementById(`root`)
  );
};

init();
