import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import leaflet from "leaflet";

import Main from "./components/main/main.jsx";
import {reducer} from "./reducer";


const handleClick = (event) => {
  console.log(`The link was clicked.`); // eslint-disable-line no-console
  event.preventDefault();
};

const init = () => {
  const store = createStore(reducer);

  ReactDOM.render(<Provider store={store}>
    <Main
      onCardTitleClick = {handleClick}
      leaflet={leaflet}
    />
  </Provider>
  , document.getElementById(`root`));
};

init();
