import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer";

import RentsList from "../rents-list/rents-list.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import Map from "../map/map.jsx";
import withActiveElement from "../../hocs/with-active-element/with-active-element.jsx";
import prepareCities from "../../utils/prepareCities";
// import getRandomNumber from "../../utils/getRandomNumber";

const CitiesListWrapped = withActiveElement(CitiesList);
const RentsListWrapped = withActiveElement(RentsList);
const onOfferChoose = (offer) => {
  // eslint-disable-next-line no-console
  console.log(`${offer.name} was chosen`);
};

const Main = (props) => {
  let cities = props.allOffers.map((offer) => offer.city);
  cities = prepareCities(cities);
  // debugger;

  if (!props.allOffers.length) {
    return `Ожидайте загрузки данных.`;
  }
  if (!Object.keys(props.city).length) {
    // props.onChooseCity(cities[getRandomNumber(5)]); TODO прикрутить рандом
    props.onChooseCity(cities[0]);
  }

  if (!props.offers.length) {
    props.onGetOffers(props.allOffers, props.city);
  }

  const isNoOffers = !props.offers.length;

  const renderOfferBlock = (isEmpty) => {
    if (isEmpty) {
      return (
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">
              We could not find any property availbale at the moment in {props.city.name}
            </p>
          </div>
        </section>
      );
    } else {
      return (
        <RentsListWrapped
          elements={props.offers}
          onElementActivate={onOfferChoose}
          cityName={props.city.name}
          rentsCount={props.offers.length}
          onCardTitleClick={props.onCardTitleClick}
        />
      );
    }
  };

  const renderMapBlock = (isEmpty) => {
    if (!isEmpty) {
      return (
        <section className="cities__map map">
          <Map
            city={props.city}
            offersLocation={props.offers.map((offer) => offer.location)}
            leaflet={props.leaflet}
          />
        </section>
      );
    } else {
      return ``;
    }
  };

  return (
    <React.Fragment>
      <div style={{display: `none`}}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"
            />
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z" />
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
            />
          </symbol>
        </svg>
      </div>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main
        className={`page__main page__main--index${
          isNoOffers ? ` page__main--index-empty` : ``
        }`}>
        <h1 className="visually-hidden">Cities</h1>

        <CitiesListWrapped
          elements={cities}
          onElementActivate={(clickedCity) => {
            props.onChooseCity(clickedCity);
            props.onGetOffers(props.allOffers, clickedCity);
          }}
        />

        <div className="cities__places-wrapper">
          <div
            className={`cities__places-container container${
              isNoOffers ? ` cities__places-container--empty` : ``
            }`}>
            {renderOfferBlock(isNoOffers)}
            <div className="cities__right-section">
              {renderMapBlock(isNoOffers)}
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

Main.propTypes = {
  offers: PropTypes.array.isRequired,
  allOffers: PropTypes.array.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onChooseCity: PropTypes.func.isRequired,
  onGetOffers: PropTypes.func.isRequired,
  leaflet: PropTypes.object.isRequired,
  city: PropTypes.shape({
    name: PropTypes.string,
    coordinates: PropTypes.array,
    rentsCount: PropTypes.number,
  }),
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    city: state.city,
    offers: state.offers,
    allOffers: state.allOffers,
  });

const mapDispatchToProps = (dispatch) => ({
  onChooseCity: (city) => dispatch(ActionCreator.changeCity(city)),

  onGetOffers: (offers, city) => {
    dispatch(ActionCreator.filterOffers(offers, city));
  },
});

export {Main};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
