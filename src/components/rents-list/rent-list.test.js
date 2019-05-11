import React from 'react';
import renderer from 'react-test-renderer';

import RentList from './rents-list';

const mockState = {
  offers: [],
  cityName: `Bangkok`,
  rentsCount: 2000,
  onCardTitleClick: jest.fn()
};

it(`Rent card component renders correctly`, () => {
  const tree = renderer
  .create(<RentList
    offers ={mockState.offers}
    cityName ={mockState.cityName}
    rentsCount ={mockState.rentsCount}
    onCardTitleClick = {mockState.onCardTitleClick}
  />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
