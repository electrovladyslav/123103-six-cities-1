import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer";

import RentsList from "../rents-list/rents-list.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import Map from "../map/map.jsx";
import withActiveElement from "../../hocs/with-active-element/with-active-element.jsx";
import prepareCities from "../../utils/prepareCities";

const CitiesListWrapped = withActiveElement(CitiesList);
const RentsListWrapped = withActiveElement(RentsList);
const onOfferChoose = (offer) => {
  // eslint-disable-next-line no-console
  console.log(`${offer.name} was chosen`);
};

const Main = (props) => {
  let cities = props.initialOffers.map((offer) => offer.city);
  cities = prepareCities(cities);

  // props.onGetOffers(cities[0]);

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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <CitiesListWrapped
          elements={cities}
          onElementActivate={(clickedCity) => {
            props.onCityClick(clickedCity);
            props.onGetOffers(clickedCity);
          }}
        />

        <div className="cities__places-wrapper">
          <div className="cities__places-container container">
            <RentsListWrapped
              elements={props.offers}
              onElementActivate={onOfferChoose}
              cityName={props.city.name}
              rentsCount={props.offers.length}
              onCardTitleClick={props.onCardTitleClick}
            />
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  city={props.city}
                  offersCords={props.offers.map((offer) => offer.coordinates)}
                  leaflet={props.leaflet}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

Main.propTypes = {
  offers: PropTypes.array.isRequired,
  initialOffers: PropTypes.array.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onCityClick: PropTypes.func.isRequired,
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
    initialOffers: state.initialOffers,
  });

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city) => dispatch(ActionCreator.changeCity(city)),

  onGetOffers: (city) => {
    dispatch(ActionCreator.getOffers(city));
  },
});

export {Main};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
