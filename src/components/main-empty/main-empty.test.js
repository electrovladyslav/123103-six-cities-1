import React from "react";
import renderer from "react-test-renderer";

<<<<<<< HEAD
import MainEmpty from "./main-empty.jsx";
=======
import MainEmpty from "./review.jsx";
>>>>>>> cb1e77c3e86232b2136aab9a1e9a6cdb85297274


it(`Review component renders correctly`, () => {
  const tree = renderer
    .create(
        <MainEmpty
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
