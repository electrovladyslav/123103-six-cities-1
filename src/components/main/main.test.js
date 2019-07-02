import React from "react";
import renderer from "react-test-renderer";
import {StaticRouter} from "react-router";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import {reducer} from "../../reducer";
import {createAPI} from "../../api";

import {Main} from "./main";
import {LoadingTypes} from "../../reducer";
import leafletMock from "../../mocks/leaflet";
import mockAllOffers from "../../mocks/allOffers";
import mockOffers from "../../mocks/offers";
import mockCities from "../../mocks/cities";
import mockUser from "../../mocks/user";

it(`Main component renders correctly`, () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(
      reducer,
      applyMiddleware(thunk.withExtraArgument(api))
  );
  const tree = renderer
    .create(
        <Provider store={store}>
          <StaticRouter>
            <Main
              elements={mockOffers}
              allOffers={mockAllOffers}
              loading={LoadingTypes.END_LOADING}
              cities={mockCities}
              activeCityNumber={0}
              activeCity={mockCities[0]}
              onCardTitleClick={jest.fn()}
              onChooseCity={jest.fn()}
              onGetOffers={jest.fn()}
              leaflet={leafletMock}
              userEmail={mockUser.email}
              userAvatarUrl={mockUser.avatarUrl}
              onSignIn={jest.fn()}
              redirectToMainEmpty={jest.fn()}
            />
          </StaticRouter>
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
