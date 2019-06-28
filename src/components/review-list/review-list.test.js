import React from "react";
import renderer from "react-test-renderer";

import ReviewList from "./review-list.jsx";
import mockReviews from "../../mocks/reviews";


it(`Review component renders correctly`, () => {
  const tree = renderer
    .create(
        <ReviewList
          reviews={mockReviews}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
