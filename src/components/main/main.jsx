import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer";
import {
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

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.redirectToMainEmpty = props.redirectToMainEmpty;

    this.handleOfferChoose = this.handleOfferChoose.bind(this);
  }

  handleOfferChoose(offer) {
    this.props.onElementActivate(offer);
  }

  render() {
    const {
      cities,
      onChooseCity,
      activeCity,
      onEriseActiveElement,
      leaflet,
    } = this.props;
    const activeOffer = this.props.activeElement;
    const offers = this.props.elements;

    if (!offers.length) {
      this.redirectToMainEmpty();
    }

    return (
      <React.Fragment>
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>

          <CitiesListWrapped
            elements={cities}
            onElementActivate={(clickedCity) => {
              onChooseCity(cities.indexOf(clickedCity));
              onEriseActiveElement();
            }}
            activeElement={activeCity}
          />

          <div className="cities__places-wrapper">
            <div
              className="cities__places-container container">
              <RentsListWrapped
                elements={offers}
                onElementActivate={this.handleOfferChoose}
                cityName={activeCity ? activeCity.name : ``}
                rentsCount={offers.length}
              />
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    city={activeCity}
                    activeOffer={activeOffer}
                    offersLocation={offers.map((offer) => offer.location)}
                    leaflet={leaflet}
                  />
                </section>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  elements: PropTypes.array,
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
  redirectToMainEmpty: PropTypes.func.isRequired,
  leaflet: PropTypes.object.isRequired,
  activeElement: PropTypes.object,
  onElementActivate: PropTypes.func,
  onEriseActiveElement: PropTypes.func,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
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
