import React from "react";
import renderer from "react-test-renderer";

import CitiesList from "./cities-list";
import cities from "../../mocks/cities";

const mockState = {
  cities,
  onCityClick: jest.fn(),
};

it(`Cities list component renders correctly`, () => {
  const tree = renderer
    .create(
        <CitiesList
          cities={mockState.cities}
          onCityClick={mockState.onCityClick}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
