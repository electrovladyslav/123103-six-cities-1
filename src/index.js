import React from "react";
import ReactDOM from "react-dom";

import Main from "./components/main/main.jsx";
import offers from "./mocks/offers";

import leaflet from "leaflet";

const handleClick = (event) => {
  console.log(`The link was clicked.`); // eslint-disable-line no-console
  event.preventDefault();
};

const init = () => {

  ReactDOM.render(<Main
    offers = {offers}
    onCardTitleClick = {handleClick}
    leaflet={leaflet}
  />, document.getElementById(`root`));
};

init();
