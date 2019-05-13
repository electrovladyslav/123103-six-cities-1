import React from 'react';
import renderer from 'react-test-renderer';

import Main from './main';

const mockState = {
  offers: [],
  onCardTitleClick: jest.fn()
};

it(`Main component renders correctly`, () => {
  const tree = renderer
  .create(<Main
    offers ={mockState.offers}
    onCardTitleClick = {mockState.onCardTitleClick}
  />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
