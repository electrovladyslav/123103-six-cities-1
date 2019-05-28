import React from "react";
import PropTypes from "prop-types";

import getUniqueArrayElements from "../../utils/getUniqueArrayElements";

const CitiesList = (props) => {
  let {cities} = props;
  const dumpCities = [
    `Paris`,
    `Cologne`,
    `Brussels`,
    `Amsterdam`,
    `Hamburg`,
    `Dusseldorf`,
  ];
  cities = cities.concat(dumpCities);
  cities = getUniqueArrayElements(cities);
  cities = cities.slice(0, 6);
  let activeCity = 0;

  return (
    <React.Fragment>
      <div className="cities tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city, index) => {
              return (
                <li className="locations__item" key={city}>
                  <a
                    className={`locations__item-link tabs__item ${index ===
                      activeCity ? `tabs__item--active` : ``}`}
                    href="#">
                    <span>{city}</span>
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
  // onCardTitleClick: PropTypes.func.isRequired,
};

export default CitiesList;
