import React from "react";
import renderer from "react-test-renderer";

import Favorites from "./favorites.jsx";

it(`Favorites component renders correctly`, () => {
  const tree = renderer
    .create(
        <Favorites
          loadFavorites={jest.fn().mockImplementation(() => Promise.resolve())}
          favorites={[]}
          favoritesOrderedByCity={{}}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
