import React from "react";
import renderer from "react-test-renderer";
import {StaticRouter} from "react-router";

import Header from "./header.jsx";

it(`Main component renders correctly`, () => {
  const tree = renderer
    .create(
        <StaticRouter>
          <Header
            userEmail={`ff@mail.com`}
          ></Header>
        </StaticRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
