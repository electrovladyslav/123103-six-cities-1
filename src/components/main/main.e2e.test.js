import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Main} from "./main";
import {LoadingTypes} from "../../reducer";

import leafletMock from "../../mocks/leaflet";
import mockAllOffers from "../../mocks/allOffers";
import mockOffers from "../../mocks/offers";
import mockCities from "../../mocks/cities";

Enzyme.configure({adapter: new Adapter()});

const onCardTitleClick = jest.fn();

it(`In main component click on card header works`, () => {
  const app = mount(
      <Main
        offers={mockOffers}
        allOffers={mockAllOffers}
        loading={LoadingTypes.END_LOADING}
        cities={mockCities}
        activeCityNumber={0}
        activeCity={mockCities[0]}
        onCardTitleClick={onCardTitleClick}
        onChooseCity={jest.fn()}
        onGetOffers={jest.fn()}
        leaflet={leafletMock}
      />
  );

  const cardHeaders = app.find(`.place-card__name`);
  cardHeaders.forEach((cardHeader) => {
    cardHeader.simulate(`click`, {preventDefault() {}});
  });
  expect(onCardTitleClick).toHaveBeenCalledTimes(cardHeaders.length);
});
