import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer";
import {
  filterOffersByCity,
  getCities,
  getActiveCity,
  getActiveCityNumber,
  getAuthRequiredStatus,
} from "../../selectors";

import RentsList from "../rents-list/rents-list.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import Map from "../map/map.jsx";

import withActiveElement from "../../hocs/with-active-element/with-active-element.jsx";

const CitiesListWrapped = withActiveElement(CitiesList);
const RentsListWrapped = withActiveElement(RentsList);

const onOfferChoose = (offerNumber) => {
  // eslint-disable-next-line no-console
  console.log(`Offer #${offerNumber} was chosen`);
};

const Main = (props) => {
  const isNoOffers = !props.offers.length;

  const renderOfferBlock = (isEmpty) => {
    if (isEmpty) {
      return (
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">
              We could not find any property availbale at the moment in{` `}
              {props.activeCity.name}
            </p>
          </div>
        </section>
      );
    } else {
      return (
        <RentsListWrapped
          elements={props.offers}
          onElementActivate={onOfferChoose}
          cityName={props.activeCity.name}
          rentsCount={props.offers.length}
        />
      );
    }
  };

  const renderMapBlock = (isEmpty) => {
    if (!isEmpty) {
      return (
        <section className="cities__map map">
          <Map
            city={props.activeCity}
            // activeOffer={}
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
      <main
        className={`page__main page__main--index${
          isNoOffers ? ` page__main--index-empty` : ``
        }`}>
        <h1 className="visually-hidden">Cities</h1>

        <CitiesListWrapped
          elements={props.cities}
          onElementActivate={(clickedCity) => {
            props.onChooseCity(clickedCity);
          }}
          activeElementNumber={props.activeCityNumber}
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
  offers: PropTypes.array,
  allOffers: PropTypes.array.isRequired,
  cities: PropTypes.array,
  activeCity: PropTypes.shape({
    name: PropTypes.string,
    coordinates: PropTypes.array,
    rentsCount: PropTypes.number,
  }),
  isAuthRequired: PropTypes.bool,
  activeCityNumber: PropTypes.number,
  onSignIn: PropTypes.func.isRequired,
  onChooseCity: PropTypes.func.isRequired,
  leaflet: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    offers: filterOffersByCity(state),
    allOffers: state.allOffers,
    isAuthRequired: getAuthRequiredStatus(state),
    cities: getCities(state),
    activeCity: getActiveCity(state),
    activeCityNumber: getActiveCityNumber(state),
  });

const mapDispatchToProps = (dispatch) => ({
  onChooseCity: (cityNumber) =>
    dispatch(ActionCreator.changeActiveCity(cityNumber)),
  onSignIn: () => dispatch(ActionCreator.requireAuthorization(true)),
});

export {Main};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
