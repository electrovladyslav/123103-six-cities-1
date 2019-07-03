import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import RentCard from "../rent-card/rent-card.jsx";
import {RentCardClassesEnum} from "../../constants";

class Favorites extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            {this._renderContent()}
          </div>
        </main>
      </React.Fragment>
    );
  }

  _renderContent() {
    if (!this.props.favorites.length) {
      return (
        <section className="favorites favorites--empty">
          <h1 className="visually-hidden">Favorites (empty)</h1>
          <div className="favorites__status-wrapper">
            <b className="favorites__status">Nothing yet saved.</b>
            <p className="favorites__status-description">
              Save properties to narrow down search or plan yor future trips.
            </p>
          </div>
        </section>
      );
    } else {
      return (
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">{this._renderFavorites()}</ul>
        </section>
      );
    }
  }

  _renderFavorites() {
    return Object.keys(this.props.favoritesOrderedByCity).map((city, index) => {
      return (
        <li className="favorites__locations-items" key={city + index}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {this.props.favoritesOrderedByCity[city].map((favorite) => (
              <RentCard
                offer={favorite}
                key={favorite.id}
                placeCardClass={RentCardClassesEnum.FAVORITES}
                onCardImageClick={() => {}}
              />
            ))}
          </div>
        </li>
      );
    });
  }
}

Favorites.propTypes = {
  favorites: PropTypes.array,
  favoritesOrderedByCity: PropTypes.shape({
    city: PropTypes.object,
  }),
};

export default Favorites;
