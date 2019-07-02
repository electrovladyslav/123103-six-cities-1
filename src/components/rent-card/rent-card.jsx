import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Bookmark from "../bookmark/bookmark.jsx";
import withBookmark from "../../hocs/with-bookmark/with-bookmark.jsx";

const BookmarkWrapped = withBookmark(Bookmark);

const RentCard = (props) => {
  const {
    isPremium = false,
    previewImageSource,
    price,
    isFavorite = false,
    rating = 3,
    name,
    type,
    id,
  } = props.offer;
  const {onCardImageClick} = props;
  return (
    <React.Fragment>
      <article className="cities__place-card place-card">
        {isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a
            href="#"
            onClick={(event) => {
              onCardImageClick(name);
              event.preventDefault();
            }}>
            <img
              className="place-card__image"
              src={previewImageSource}
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
            <BookmarkWrapped isFavorite={isFavorite} offerId={id}/>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: rating * 20 + `%`}} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link to={`/offer/${id}`}>{name}</Link>
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
    previewImageSource: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool,
    rating: PropTypes.number,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  onCardImageClick: PropTypes.func,
};

export default RentCard;
