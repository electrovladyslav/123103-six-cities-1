import React from "react";
import renderer from "react-test-renderer";

import Map from "./map";
import leafletMock from "../../mocks/leaflet";

const mockState = {
  city: {
    name: `London`,
    location: {
      latitude: 51.50851,
      longitude: -0.12574,
    },
    rentsCount: 125,
  },
  offersLocation: [
    {
      latitude: 51.5053943508,
      longitude: -0.1229309666406198,
    },
    {
      latitude: 51.50553943508,
      longitude: -0.1253943508,
    },
    {
      latitude: 51.5009553943508,
      longitude: -0.12553943508,
    },
  ],
};

it(`Map component renders correctly`, () => {
  const tree = renderer
    .create(
        <Map
          city={mockState.city}
          offersLocation={mockState.offersLocation}
          leaflet={leafletMock}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
