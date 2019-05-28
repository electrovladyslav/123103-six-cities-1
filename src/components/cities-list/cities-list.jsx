import React from "react";
import PropTypes from "prop-types";

import getUniqueCities from "../../utils/getUniqueCities";
import dumpCities from "../../mocks/cities";

const CitiesList = (props) => {
  const onCityClick = props.onCityClick;
  let cities = props.cities;
  let activeCity = 0;

  cities = cities.concat(dumpCities);
  cities = getUniqueCities(cities);
  cities = cities.slice(0, 6);

  return (
    <React.Fragment>
      <div className="cities tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city, index) => {
              const cityClassActive =
                index === activeCity ? ` tabs__item--active` : ``;
              return (
                <li className="locations__item" key={city.name}>
                  <a
                    onClick={() => {
                      onCityClick(city);
                      activeCity = index;
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
};

CitiesList.propTypes = {
  cities: PropTypes.array.isRequired,
  // cityName: PropTypes.string.isRequired,
  // rentsCount: PropTypes.number.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

export default CitiesList;
