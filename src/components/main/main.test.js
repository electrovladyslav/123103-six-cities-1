import React from "react";
import renderer from "react-test-renderer";

import {Main} from "./main";
import leafletMock from "../../mocks/leaflet";
import mockOffers from "../../mocks/offers";

it(`Main component renders correctly`, () => {
  const tree = renderer
    .create(
        <Main
          activeCityNumber={0}
          allOffers={mockOffers}
          onCardTitleClick={jest.fn()}
          onChooseCity={jest.fn()}
          onGetOffers={jest.fn()}
          leaflet={leafletMock}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
