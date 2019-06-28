import React from "react";
import renderer from "react-test-renderer";

import Review from "./review.jsx";
import mockReviews from "../../mocks/reviews";


it(`Review component renders correctly`, () => {
  const tree = renderer
    .create(
        <Review
          review={mockReviews[0]}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
