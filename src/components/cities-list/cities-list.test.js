import React from "react";
import renderer from "react-test-renderer";

import CitiesList from "./cities-list";

const mockState = {
  cities: [
    `Paris`,
    `Cologne`,
    `Brussels`,
    `Amsterdam`,
    `Hamburg`,
    `Dusseldorf`,
  ]
};

it(`Rent list component renders correctly`, () => {
  const tree = renderer
    .create(
        <CitiesList
          cities={mockState.cities}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
