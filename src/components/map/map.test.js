import React from 'react';
import renderer from 'react-test-renderer';

import Map from './map';
import leafletMock from "../../mocks/leaflet";

const mockState = {
  city: {
    name: `London`,
    coordinates: [51.50851, -0.12574],
    rentsCount: 125,
  },
  offersCords: [
    [51.5053943508, -0.1253943508],
    [51.50553943508, -0.12553943508],
    [51.5009553943508, -0.1229309666406198]
  ],
};

it(`Map component renders correctly`, () => {
  const tree = renderer
  .create(<Map
    city={mockState.city}
    offersCords={mockState.offersCords}
    leaflet={leafletMock}
  />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
