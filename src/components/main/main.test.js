import React from "react";
import renderer from "react-test-renderer";

import {Main} from "./main";
import {LoadingTypes} from "../../reducer";
import leafletMock from "../../mocks/leaflet";
import mockAllOffers from "../../mocks/allOffers";
import mockOffers from "../../mocks/offers";
import mockCities from "../../mocks/cities";


it(`Main component renders correctly`, () => {
  const tree = renderer
    .create(
        <Main
          offers={mockOffers}
          allOffers={mockAllOffers}
          loading={LoadingTypes.END_LOADING}
          cities={mockCities}
          activeCityNumber={0}
          activeCity={mockCities[0]}
          onCardTitleClick={jest.fn()}
          onChooseCity={jest.fn()}
          onGetOffers={jest.fn()}
          leaflet={leafletMock}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
