import React from "react";
import renderer from "react-test-renderer";

import ReviewForm from "./review-form.jsx";

it(`Review component renders correctly`, () => {
  const tree = renderer
    .create(
        <ReviewForm
          onSubmit={jest.fn()}
          onSetRating={jest.fn()}
          onSetComment={jest.fn()}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
