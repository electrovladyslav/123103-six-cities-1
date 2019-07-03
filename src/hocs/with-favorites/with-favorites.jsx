import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withFavorites = (Component) => {
  class WithFavorites extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        favorites: [],
        favoritesOrderedByCity: {},
      };

      this.props.loadFavorites().then((response) => {
        this.setState({
          favorites: response,
          favoritesOrderedByCity: this._orderFavoritesByCity(response),
        });
        this.forceUpdate();
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          favorites={this.state.favorites}
          favoritesOrderedByCity={this.state.favoritesOrderedByCity}
        />
      );
    }

    _orderFavoritesByCity(favorites) {
      const favoritesOrderedByCity = {};

      favorites.forEach((element) => {
        if (!favoritesOrderedByCity[element.city.name]) {
          favoritesOrderedByCity[element.city.name] = [element];
        } else {
          favoritesOrderedByCity[element.city.name].push(element);
        }
      });

      return favoritesOrderedByCity;
    }
  }

  WithFavorites.propTypes = {
    loadFavorites: PropTypes.func.isRequired,
  };

  return WithFavorites;
};

export default withFavorites;
