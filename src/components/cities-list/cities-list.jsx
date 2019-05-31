import React from "react";
import PropTypes from "prop-types";

const CitiesList = (props) => {
  const cities = props.elements.slice();

  return (
    <React.Fragment>
      <div className="cities tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city, number) => {
              const cityClassActive =
                number === props.activeElementNumber
                  ? ` tabs__item--active`
                  : ``;
              return (
                <li className="locations__item" key={city.name}>
                  <a
                    onClick={() => {
                      props.onElementActivate(city);
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
  elements: PropTypes.array.isRequired,
  onElementActivate: PropTypes.func.isRequired,
  activeElementNumber: PropTypes.number.isRequired,
};

export default CitiesList;
