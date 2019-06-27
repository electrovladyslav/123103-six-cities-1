import React from "react";
import PropTypes from "prop-types";

const Review = (props) => {
  const {user, rating, comment} = props.review;
  const date = new Date(props.review.date);

  return (
    <React.Fragment>
      <li className="reviews__item">
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img
              className="reviews__avatar user__avatar"
              src={user.avatarUrl}
              width="54"
              height="54"
              alt="Reviews avatar"
            />
          </div>
          <span className="reviews__user-name">{user.name}</span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{width: rating * 20 + `%`}} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <p className="reviews__text">
            {comment}
          </p>
          <time className="reviews__time" dateTime={date}>
            {date.toLocaleDateString(`en-EU`, {year: `numeric`, month: `long`})}
          </time>
        </div>
      </li>
    </React.Fragment>
  );
};

Review.propTypes = {
  review: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
      isPro: PropTypes.bool,
      name: PropTypes.string,
      avatarUrl: PropTypes.string
    }),
    rating: PropTypes.number,
    comment: PropTypes.string,
    date: PropTypes.string,
  })
};

export default Review;
