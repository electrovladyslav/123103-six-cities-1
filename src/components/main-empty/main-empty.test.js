import React from "react";
import renderer from "react-test-renderer";

import MainEmpty from "./review.jsx";


it(`Review component renders correctly`, () => {
  const tree = renderer
    .create(
        <MainEmpty
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
