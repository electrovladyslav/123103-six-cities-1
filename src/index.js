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

const init = ({rentNames} = initialState) => {

  ReactDOM.render(<Main
    rentNames = {rentNames}
  />, document.getElementById(`root`));
};

init();
