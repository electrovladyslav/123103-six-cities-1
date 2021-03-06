import React from "react";
import renderer from "react-test-renderer";

import CitiesList from "./cities-list";
import cities from "../../mocks/cities";

const mockState = {
  cities,
  onElementClick: jest.fn(),
};

it(`Cities list component renders correctly`, () => {
  const tree = renderer
    .create(
        <CitiesList
          elements={mockState.cities}
          onElementActivate={mockState.onElementClick}
          activeElement={mockState.cities[0]}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
