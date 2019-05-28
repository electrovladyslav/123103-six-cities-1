import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import getUniqueCities from "../../utils/getUniqueCities";
import dumpCities from "../../mocks/cities";

class CitiesList extends PureComponent {
  constructor(props) {
    super(props);
    this.activeCity = 0;
    this.onCityClick = this.props.onCityClick;
    this.cities = this.props.cities;
    this.cities = this.cities.concat(dumpCities);
    this.cities = getUniqueCities(this.cities);
    this.cities = this.cities.slice(0, 6);
  }

  render() {
    return (
      <React.Fragment>
        <div className="cities tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {this.cities.map((city, index) => {
                const cityClassActive =
                  index === this.activeCity ? ` tabs__item--active` : ``;
                return (
                  <li className="locations__item" key={city.name}>
                    <a
                      onClick={() => {
                        this.onCityClick(city);
                        this.activeCity = index;
                      }}
                      className={`locations__item-link tabs__item${cityClassActive}`}
                      href="#">
                      <span>{city.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

CitiesList.propTypes = {
  cities: PropTypes.array.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

export default CitiesList;
