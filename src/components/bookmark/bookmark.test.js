import React from "react";
import renderer from "react-test-renderer";
import {StaticRouter} from "react-router";

import Bookmark from "./bookmark.jsx";

it(`Bookmark component renders correctly`, () => {
  const tree = renderer
    .create(
        <StaticRouter>
          <Bookmark
            isFavorite={false}
            offerId={42}
            isAuthorized={true}
            bookmarkSize={{
              width: 300,
              height: 300,
            }}
          />
        </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
