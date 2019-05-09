import React from "react";
import PropTypes from "prop-types";

const RentCard = (props) => {
  const {
    isPremium = false,
    imageSource,
    price,
    isBookmarked = false,
    rating = 3,
    name,
    type,
  } = props.offer;
  const onCardTitleClick = props.onCardTitleClick;

  return (
    <React.Fragment>
      <article className="cities__place-card place-card">
        {isPremium && <div className="place-card__mark">
          <span>Premium</span>
        </div>}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img
              className="place-card__image"
              src={imageSource}
              width="260"
              height="200"
              alt="Place image"
            />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button
              className={`place-card__bookmark-button button ${isBookmarked && `place-card__bookmark-button--active`}`}
              type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: rating * 20 + `%`}} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name" onClick={onCardTitleClick}>
            <a href="#">{name}</a>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    </React.Fragment>
  );
};

RentCard.propTypes = {
  offer: PropTypes.shape({
    isPremium: PropTypes.bool,
    imageSource: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    isBookmarked: PropTypes.bool,
    rating: PropTypes.number,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  onCardTitleClick: PropTypes.func.isRequired
};

export default RentCard;
