import React from 'react';
import renderer from 'react-test-renderer';

import RentList from './rents-list';

const mockState = {
  offers: [],
  cityName: `Bangkok`,
  rentsCount: 2000,
  activeElementNumber: 0,
  onCardTitleClick: jest.fn(),
  onElementActivate: jest.fn(),
};

it(`Rent list component renders correctly`, () => {
  const tree = renderer
  .create(<RentList
    activeElementNumber={mockState.activeElementNumber}
    elements ={mockState.offers}
    cityName ={mockState.cityName}
    rentsCount ={mockState.rentsCount}
    onCardTitleClick = {mockState.onCardTitleClick}
    onElementActivate = {mockState.onElementActivate}
  />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
