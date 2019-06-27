import React from 'react';
import renderer from 'react-test-renderer';

import RentCard from './rent-card';

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
  .create(<RentCard
    offer ={mockOffer}
    onCardTitleClick = {jest.fn()}
    onCardImageClick = {jest.fn()}

  />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
