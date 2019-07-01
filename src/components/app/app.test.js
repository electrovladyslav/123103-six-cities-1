import React from "react";
import {Provider} from "react-redux";
import renderer from "react-test-renderer";
import {MemoryRouter} from "react-router";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import {reducer} from "../../reducer";
import {createAPI} from "../../api";
import {App} from "./app.jsx";

import leafletMock from "../../mocks/leaflet";
import mockOffers from "../../mocks/offers";
import mockAllOffers from "../../mocks/allOffers";
import mockCities from "../../mocks/cities";

it(`App component renders correctly`, () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(
      reducer,
      applyMiddleware(thunk.withExtraArgument(api))
  );

  // Падал тест при отрисовке карты, пришлось добавить вот это
  const div = global.document.createElement(`div`);
  div.setAttribute(`id`, `map`);
  global.document.body.appendChild(div);

  const tree = renderer
    .create(
        <Provider store={store}>
          <MemoryRouter>
            <App
              leaflet={leafletMock}
              offers={mockOffers}
              userEmail={`vasya@pots.com`}
              userAvatarUrl={`flewlfjweij`}
              allOffers={mockAllOffers}
              cities={mockCities}
              activeCityNumber={0}
              activeCity={mockCities[0]}
              onSignIn={jest.fn()}
              onCardTitleClick={jest.fn()}
              onChooseCity={jest.fn()}
              onGetOffers={jest.fn()}
              redirectToMainEmpty={jest.fn()}
            />
          </MemoryRouter>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
