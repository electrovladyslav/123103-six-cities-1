import React from "react";
import PropTypes from "prop-types";

import {RATING_VALUES, ReviewConstants} from "../../constants";

const ReviewForm = ({onSubmit, setRating, setComment, isError, isSubmitDisabled}) => {
  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={onSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATING_VALUES.map((ratingValue, number) => {
          const value = RATING_VALUES.length - number;
          return (
            <React.Fragment key={ratingValue}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={value}
                id={`${value}-stars`}
                type="radio"
                onChange={setRating}
              />
              <label
                htmlFor={`${value}-stars`}
                className="reviews__rating-label form__rating-label"
                title={ratingValue}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </React.Fragment>
          );
        })}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={setComment}
        // value={textareaValue}
      />
      <div className="reviews__button-wrapper">
        <p className={`reviews__help ${isError ? `reviews__help--error` : ``}`}>
          To submit review please make sure to set{` `}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{` `}
          <b className="reviews__text-amount">{ReviewConstants.MIN_CHARACTERS}</b>, but not more than{` `}
          <b className="reviews__text-amount">{ReviewConstants.MAX_CHARACTERS} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}>
          Submit
        </button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setRating: PropTypes.func.isRequired,
  setComment: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  isSubmitDisabled: PropTypes.bool,
};

export default ReviewForm;
