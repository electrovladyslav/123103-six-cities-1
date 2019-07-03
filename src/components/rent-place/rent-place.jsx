import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {Operation} from "../../reducer";

import ReviewList from "../review-list/review-list.jsx";
import Map from "../map/map.jsx";
import RentCard from "../rent-card/rent-card.jsx";
import ReviewForm from "../review-form/review-form.jsx";
import Bookmark from "../bookmark/bookmark.jsx";
import withReview from "../../hocs/with-review/with-review.jsx";
import withBookmark from "../../hocs/with-bookmark/with-bookmark.jsx";

const BookmarkWrapped = withBookmark(Bookmark);

import {MAX_OFFER_IMAGES, BookmarkSize, RentCardClassesEnum} from "../../constants";
import {getReviews, getAuthrizationStatus} from "../../selectors";

const ReviewFormWrapped = withReview(ReviewForm);

class RentPlace extends PureComponent {
  constructor(props) {
    super(props);
    this.props.loadReviews(this.props.offerId);

    this.handleReviewSending = this.handleReviewSending.bind(this);
  }

  handleReviewSending(review) {
    this.props.sendReview(this.props.offerId, review);
  }

  render() {
    const {leaflet, offer, nearestOffers, reviews, isAuthrized} = this.props;

    if (!offer) {
      return ``;
    }

    const {
      isPremium = false,
      price,
      isFavorite = false,
      rating = 3,
      images,
      name,
      bedrooms = 1,
      maxAdults = 1,
      goods,
      type,
      description,
      location,
      id,
    } = offer;

    return (
      <React.Fragment>
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {images.slice(0, MAX_OFFER_IMAGES).map((imageSrc) => {
                  return (
                    <div className="property__image-wrapper" key={imageSrc}>
                      <img
                        className="property__image"
                        src={imageSrc}
                        alt="Photo studio"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="property__container container">
              <div className="property__wrapper">
                {isPremium ? (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                ) : (
                  ``
                )}
                <div className="property__name-wrapper">
                  <h1 className="property__name">{name}</h1>
                  <BookmarkWrapped
                    isFavorite={isFavorite}
                    offerId={id}
                    bookmarkSize={BookmarkSize.BIG}
                    bookmarkClass={RentCardClassesEnum.RENT_PLACE}
                  />
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: rating * 20 + `%`}} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">
                    {rating}
                  </span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {goods.map((good) => {
                      return (
                        <li className="property__inside-item" key={good}>
                          {good}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="property__avatar user__avatar"
                        src="img/avatar-angelina.jpg"
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="property__user-name">Angelina</span>
                    <span className="property__user-status">Pro</span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">{description}</p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <ReviewList reviews={reviews} />
                  {isAuthrized ? (
                    <ReviewFormWrapped
                      onSendReview={this.handleReviewSending}
                      isAuthrized={isAuthrized}
                    />
                  ) : (
                    ``
                  )}
                </section>
              </div>
            </div>
            <section className="property__map map">
              <Map
                activeOffer={{location}}
                offersLocation={nearestOffers.map(
                    (nearestOffer) => nearestOffer.location
                )}
                leaflet={leaflet}
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                {nearestOffers.map((nearestOffer, index) => (
                  <RentCard
                    offer={nearestOffer}
                    key={nearestOffer.name + index}
                  />
                ))}
              </div>
            </section>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

RentPlace.propTypes = {
  offer: PropTypes.shape({
    isPremium: PropTypes.bool,
    previewImageSource: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    isBookmarked: PropTypes.bool,
    rating: PropTypes.number,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    bedrooms: PropTypes.number,
    maxAdults: PropTypes.number,
    goods: PropTypes.array.isRequired,
    description: PropTypes.string,
  }),
  offerId: PropTypes.number,
  leaflet: PropTypes.object,
  nearestOffers: PropTypes.array.isRequired,
  loadReviews: PropTypes.func.isRequired,
  sendReview: PropTypes.func,
  reviews: PropTypes.array.isRequired,
  isAuthrized: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    reviews: getReviews(state),
    isAuthrized: getAuthrizationStatus(state),
  });

const mapDispatchToProps = (dispatch) => ({
  loadReviews: (offerId) => {
    dispatch(Operation.loadReviews(offerId));
  },

  sendReview: (offerId, review) => {
    dispatch(Operation.sendReviews(offerId, review));
  },
});

export {RentPlace};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RentPlace);
