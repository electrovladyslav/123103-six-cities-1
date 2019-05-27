import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";

import Main from "./components/main/main.jsx";
import offers from "./mocks/offers";
import {reducer} from "./reducer";


import leaflet from "leaflet";

const handleClick = (event) => {
  console.log(`The link was clicked.`); // eslint-disable-line no-console
  event.preventDefault();
};

const init = () => {
  const store = createStore(reducer);

  ReactDOM.render(<Provider store={store}>
    <Main
      offers = {offers}
      onCardTitleClick = {handleClick}
      leaflet={leaflet}
    />
  </Provider>
  , document.getElementById(`root`));
};

init();
