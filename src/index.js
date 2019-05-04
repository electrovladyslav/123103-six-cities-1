import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/main/main.jsx";

const init = () => {
  const initialState = {
    rentNames: [
      `Beautiful & luxurious apartment at great location`,
      `Wood and stone place`,
      `Canal View Prinsengracht`,
      `Nice, cozy, warm big bed apartment`,
      `Wood and stone place`,
    ]
  };

  ReactDOM.render(<Main
    rentNames = {initialState.rentNames}
  />, document.getElementById(`root`));
};

init();
