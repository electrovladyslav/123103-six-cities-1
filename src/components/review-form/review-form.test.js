import React from "react";
import renderer from "react-test-renderer";

import ReviewForm from "./review-form.jsx";

it(`Review component renders correctly`, () => {
  const tree = renderer
    .create(
        <ReviewForm
          onSubmit={jest.fn()}
          setRating={jest.fn()}
          setComment={jest.fn()}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
