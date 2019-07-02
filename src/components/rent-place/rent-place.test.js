import React from "react";
import renderer from "react-test-renderer";
import {StaticRouter} from "react-router";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import {reducer} from "../../reducer";
import {createAPI} from "../../api";

import {RentPlace} from "./rent-place.jsx";
import mockOffers from "../../mocks/allOffers";
import mockReviews from "../../mocks/reviews";
import leafletMock from "../../mocks/leaflet";

it(`Rent place component renders correctly`, () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(
      reducer,
      applyMiddleware(thunk.withExtraArgument(api))
  );
  const tree = renderer
    .create(
        <Provider store={store}>
          <StaticRouter>
            <RentPlace
              offer={mockOffers[0]}
              reviews={mockReviews}
              onCardTitleClick={jest.fn()}
              onCardImageClick={jest.fn()}
              loadReviews={jest.fn()}
              nearestOffers={mockOffers}
              leaflet={leafletMock}
            />
          </StaticRouter>
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
