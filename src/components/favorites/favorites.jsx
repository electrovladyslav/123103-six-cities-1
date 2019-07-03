import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import RentCard from "../rent-card/rent-card.jsx";
import {RentCardClassesEnum} from "../../constants";

class Favorites extends PureComponent {
  constructor(props) {
    super(props);

    this.props.loadFavorites().then((response) => {
      this.favorites = this._prepareFavorites(response);

      this.forceUpdate();
    });
  }

  render() {
    if (!this.favorites) {
      return `Please wait for data loading.`;
    }
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

  _prepareFavorites(favorites) {
    if (!favorites.length) {
      return favorites;
    }
    this.favoritesOrderedByCity = {};
    favorites.forEach((element) => {
      if (!this.favoritesOrderedByCity[element.city.name]) {
        this.favoritesOrderedByCity[element.city.name] = [element];
      } else {
        this.favoritesOrderedByCity[element.city.name].push(element);
      }
    });
    return favorites;
  }

  _renderFavorites() {
    return Object.keys(this.favoritesOrderedByCity).map((city, index) => {
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
            {this.favoritesOrderedByCity[city].map((favorite) => (
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

  _renderContent() {
    if (!this.favorites.length) {
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
          <ul className="favorites__list">
            {this._renderFavorites()}
          </ul>
        </section>
      );
    }
  }
}

Favorites.propTypes = {
  loadFavorites: PropTypes.func.isRequired,
};

export default Favorites;
