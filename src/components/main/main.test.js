import React from "react";
import renderer from "react-test-renderer";

import {Main} from "./main";
import leafletMock from "../../mocks/leaflet";
import offers from "../../mocks/offers";

const mockState = {
  offers,
  onCardTitleClick: jest.fn(),
  city: {
    name: `Moscow`,
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
  },
};

it(`Main component renders correctly`, () => {
  const tree = renderer
    .create(
        <Main
          city={mockState.city}
          offers={[]}
          allOffers={mockState.offers}
          onCardTitleClick={mockState.onCardTitleClick}
          onChooseCity={jest.fn()}
          onGetOffers={jest.fn()}
          leaflet={leafletMock}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
