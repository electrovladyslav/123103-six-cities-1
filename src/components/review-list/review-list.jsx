import React from "react";
import PropTypes from "prop-types";

import Review from "../review/review.jsx";

const ReviewList = (props) => {
  const reviews = props.reviews;

  return (
    <React.Fragment>
      <h2 className="reviews__title">
        Reviews &middot;{` `}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>

      <ul className="reviews__list">
        {reviews
          .sort(
              (review1, review2) =>
                new Date(review2.date) - new Date(review1.date)
          )
          .map((review) => (
            <Review review={review} key={review.id} />
          ))}
      </ul>
    </React.Fragment>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.array,
};

export default ReviewList;
