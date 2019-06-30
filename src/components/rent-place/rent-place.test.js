import React from "react";
import renderer from "react-test-renderer";
import {StaticRouter} from "react-router";

import {RentPlace} from "./rent-place.jsx";
import mockOffers from "../../mocks/allOffers";
import mockReviews from "../../mocks/reviews";
import leafletMock from "../../mocks/leaflet";

it(`Rent place component renders correctly`, () => {
  const tree = renderer
    .create(
        <StaticRouter>
          <RentPlace
            offer={mockOffers[0]}
            reviews={mockReviews}
            onCardTitleClick={jest.fn()}
            onCardImageClick={jest.fn()}
            loadReviews={jest.fn()}
            nearestOffers={mockOffers}
            leaflet={leafletMock}
          />
        </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
