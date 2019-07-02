import React from "react";
import renderer from "react-test-renderer";
import {StaticRouter} from "react-router";

import {Bookmark} from "./bookmark.jsx";

it(`Bookmark component renders correctly`, () => {
  const tree = renderer
    .create(
        <StaticRouter>
          <Bookmark isFavorite={false} offerId={42} />
        </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
