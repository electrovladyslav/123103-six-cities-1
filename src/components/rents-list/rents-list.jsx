import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import RentCard from "../rent-card/rent-card.jsx";

class RentsList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {elements, cityName, rentsCount} = this.props;
    return (
      <React.Fragment>
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {rentsCount} places to stay in {cityName}
          </b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex="0">
              Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select" />
              </svg>
            </span>
            {/* <ul className="places__options places__options--custom places__options--opened">
              <li
                className="places__option places__option--active"
                tabIndex="0">
                Popular
              </li>
              <li className="places__option" tabIndex="0">
                Price: low to high
              </li>
              <li className="places__option" tabIndex="0">
                Price: high to low
              </li>
              <li className="places__option" tabIndex="0">
                Top rated first
              </li>
            </ul>
            {/*
                <select className="places__sorting-type" id="places-sorting">
                  <option className="places__option" value="popular" selected="">Popular</option>
                  <option className="places__option" value="to-high">Price: low to high</option>
                  <option className="places__option" value="to-low">Price: high to low</option>
                  <option className="places__option" value="top-rated">Top rated first</option>
                </select>
                */}
          </form>
          <div className="cities__places-list places__list tabs__content">
            {/* ---Rent card--- */}
            {elements.map((offer, index) => {
              return (
                <RentCard
                  offer={offer}
                  onCardImageClick={() => {
                    this._setActiveCard(offer);
                  }}
                  key={`${offer.name}${index}`}
                />
              );
            })}
            {/* ---End of rent card--- */}
          </div>
        </section>
      </React.Fragment>
    );
  }

  _setActiveCard(offer) {
    this.props.onElementActivate(offer);
  }
}

RentsList.propTypes = {
  elements: PropTypes.array.isRequired,
  cityName: PropTypes.string.isRequired,
  rentsCount: PropTypes.number.isRequired,
  onElementActivate: PropTypes.func.isRequired,
  // isNeighbourhood: PropTypes.bool,
};

export default RentsList;
