import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Main} from "./main";

import leafletMock from "../../mocks/leaflet";
import offers from "../../mocks/offers";

Enzyme.configure({adapter: new Adapter()});

const onCardTitleClick = jest.fn();
const mockOffers = offers.slice(0, 4);
const mockCity = {
  name: `Moscow`,
  location: {
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10
  }
};

it(`In main component click on card header works`, () => {
  const app = mount(
      <Main
        city={mockCity}
        allOffers={mockOffers}
        offers={[]}
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
