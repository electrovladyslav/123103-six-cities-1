import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import prepareCities from "../../utils/prepareCities";

class CitiesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCity: this.props.cities[0],
    };

    this.cities = prepareCities(this.props.cities);
  }

  render() {
    return (
      <React.Fragment>
        <div className="cities tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {this.cities.map((city) => {
                const cityClassActive =
                  city === this.state.activeCity ? ` tabs__item--active` : ``;
                return (
                  <li className="locations__item" key={city.name}>
                    <a
                      onClick={() => {
                        this.props.onCityClick(city);
                        this.setState({activeCity: city});
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
