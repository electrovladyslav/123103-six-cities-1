import React from "react";
import renderer from "react-test-renderer";
import {StaticRouter} from "react-router";

import RentCard from "./rent-card";

const mockOffer = {
  isPremium: false,
  previewImageSource: `blabla.jpg`,
  price: 100,
  isBookmarked: false,
  rating: 3,
  name: `Super very best appartment`,
  type: `Closet`,
};

it(`Rent card component renders correctly`, () => {
  const tree = renderer
    .create(
        <StaticRouter>
          <RentCard
            offer={mockOffer}
            onCardTitleClick={jest.fn()}
            onCardImageClick={jest.fn()}
          />
        </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
