import React from "react";
import renderer from "react-test-renderer";

import Favorites from "./favorites.jsx";

it(`Favorites component renders correctly`, () => {
  const tree = renderer.create(<Favorites />).toJSON();
  expect(tree).toMatchSnapshot();
});
