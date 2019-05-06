import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/main/main.jsx";

const initialState = {
  rentNames: [
    `Beautiful & luxurious apartment at great location`,
    `Wood and stone place`,
    `Canal View Prinsengracht`,
    `Nice, cozy, warm big bed apartment`,
  ]
};

const handleClick = (event) => {
  console.log(`The link was clicked.`); // eslint-disable-line no-console
  event.preventDefault();
};

const init = ({rentNames} = initialState) => {

  ReactDOM.render(<Main
    rentNames = {rentNames}
    onCardTitleClick = {handleClick}
  />, document.getElementById(`root`));
};

init();
