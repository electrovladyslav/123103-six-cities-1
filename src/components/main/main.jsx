import React, {PureComponent} from "react";
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

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeOfferNumber: null,
    };

    this.onOfferChoose = this.onOfferChoose.bind(this);
    this.redirectToMainEmpty = props.redirectToMainEmpty;
  }

  onOfferChoose(offerNumber) {
    this.setState({activeOfferNumber: offerNumber});
  }

  render() {
    if (!this.props.offers.length) {
      this.redirectToMainEmpty();
    }
    return (
      <React.Fragment>
        <main
          className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>

          <CitiesListWrapped
            elements={this.props.cities}
            onElementActivate={(clickedCity) => {
              this.props.onChooseCity(clickedCity);
              this.setState({activeOfferNumber: null});
            }}
            activeElementNumber={this.props.activeCityNumber}
          />

          <div className="cities__places-wrapper">
            <div
              className={`cities__places-container container${
                this.isNoOffers ? ` cities__places-container--empty` : ``
              }`}>
              <RentsListWrapped
                elements={this.props.offers}
                onElementActivate={this.onOfferChoose}
                cityName={this.props.activeCity.name}
                rentsCount={this.props.offers.length}
              />
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    city={this.props.activeCity}
                    activeOffer={
                      this.props.offers[this.state.activeOfferNumber]
                    }
                    offersLocation={this.props.offers.map(
                        (offer) => offer.location
                    )}
                    leaflet={this.props.leaflet}
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
  redirectToMainEmpty: PropTypes.func.isRequired,
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
