import React from "react";
import renderer from "react-test-renderer";
import {StaticRouter} from "react-router";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import {reducer} from "../../reducer";
import {createAPI} from "../../api";

import RentCard from "./rent-card";

const mockOffer = {
  isPremium: false,
  previewImageSource: `blabla.jpg`,
  price: 100,
  isBookmarked: false,
  rating: 3,
  name: `Super very best appartment`,
  type: `Closet`,
};

it(`Rent card component renders correctly`, () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(
      reducer,
      applyMiddleware(thunk.withExtraArgument(api))
  );
  const tree = renderer
    .create(
        <Provider store={store}>
          <StaticRouter>
            <RentCard
              offer={mockOffer}
              onCardTitleClick={jest.fn()}
              onCardImageClick={jest.fn()}
            />
          </StaticRouter>
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
