import React from "react";
import renderer from "react-test-renderer";
import {StaticRouter} from "react-router";

import RentPlace from "./rent-place.jsx";
import mockOffers from "../../mocks/allOffers";
import leafletMock from "../../mocks/leaflet";

it(`Rent place component renders correctly`, () => {
  const tree = renderer
    .create(
        <StaticRouter>
          <RentPlace
            offer={mockOffers[0]}
            onCardTitleClick={jest.fn()}
            onCardImageClick={jest.fn()}
            nearestOffers={mockOffers}
            leaflet={leafletMock}
          />
        </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
