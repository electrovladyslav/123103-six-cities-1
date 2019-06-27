import React from "react";
import renderer from "react-test-renderer";
import {StaticRouter} from "react-router";

import RentPlace from "./rent-place.jsx";

const mockOffer = {
  isPremium: false,
  previewImageSource: `blabla.jpg`,
  price: 100,
  isBookmarked: false,
  rating: 3,
  name: `Super very best appartment`,
  type: `Closet`,
  images: [],
  goods: [],
};

it(`Rent place component renders correctly`, () => {
  const tree = renderer
    .create(
        <StaticRouter>
          <RentPlace
            offer={mockOffer}
            onCardTitleClick={jest.fn()}
            onCardImageClick={jest.fn()}
          />
        </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
