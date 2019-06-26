import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Main} from "./main";
import {LoadingTypes} from "../../reducer";
import {StaticRouter} from "react-router";

import leafletMock from "../../mocks/leaflet";
import mockAllOffers from "../../mocks/allOffers";
import mockOffers from "../../mocks/offers";
import mockCities from "../../mocks/cities";
import mockUser from "../../mocks/user";

Enzyme.configure({adapter: new Adapter()});

const onCardTitleClick = jest.fn();

it(`In main component click on card header works`, () => {
  const app = mount(
      <StaticRouter>
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
          userEmail={mockUser.email}
          userAvatarUrl={mockUser.avatarUrl}
          onSignIn={jest.fn()}
        />
      </StaticRouter>
  );

  const cardHeaders = app.find(`.place-card__name`);
  cardHeaders.forEach((cardHeader) => {
    cardHeader.simulate(`click`, {preventDefault() {}});
  });
  expect(onCardTitleClick).toHaveBeenCalledTimes(cardHeaders.length);
});
