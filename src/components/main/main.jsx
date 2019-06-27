import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {ActionCreator, LoadingTypes} from "../../reducer";
import {baseURL} from "../../api";
import {
  filterOffersByCity,
  getCities,
  getActiveCity,
  getLoadingStatus,
  getActiveCityNumber,
  getAuthRequiredStatus,
  getUserEmail,
  getUserAvatarUrl,
} from "../../selectors";

import RentsList from "../rents-list/rents-list.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import Map from "../map/map.jsx";
import SignIn from "../sign-in/sign-in.jsx";

import withActiveElement from "../../hocs/with-active-element/with-active-element.jsx";

const CitiesListWrapped = withActiveElement(CitiesList);
const RentsListWrapped = withActiveElement(RentsList);

const onOfferChoose = (offerNumber) => {
  // eslint-disable-next-line no-console
  console.log(`Offer #${offerNumber} was chosen`);
};

const Main = (props) => {
  switch (props.loading) {
    case LoadingTypes.LOAD_FAIL:
      return `Что-то пошло не так, перезагрузите страницу.`;

    case LoadingTypes.START_LOADING:
      return `Ожидайте загрузки данных.`;

    case LoadingTypes.END_LOADING:
    default:
      break;
  }

  if (props.isAuthRequired) {
    return <SignIn />;
  }

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
            offersLocation={props.offers.map((offer) => offer.location)}
            leaflet={props.leaflet}
          />
        </section>
      );
    } else {
      return ``;
    }
  };

  const renderHeaderLogin = (isLogged) => {
    if (isLogged) {
      return (
        <React.Fragment>
          <Link
            className="header__nav-link header__nav-link--profile"
            to="/favorites">
            <div
              className="header__avatar-wrapper user__avatar-wrapper"
              style={{backgroundImage: `url(${baseURL + props.userAvatarUrl})`}}
            />
            <span className="header__user-name user__name">
              {props.userEmail}
            </span>
          </Link>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Link
            className="header__nav-link header__nav-link--profile"
            to="/login">
            <div className="header__avatar-wrapper user__avatar-wrapper" />
            <span className="header__login">Sign in</span>
          </Link>
        </React.Fragment>
      );
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
                  {renderHeaderLogin(props.userEmail.length)}
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
  loading: PropTypes.string,
  cities: PropTypes.array,
  activeCity: PropTypes.shape({
    name: PropTypes.string,
    coordinates: PropTypes.array,
    rentsCount: PropTypes.number,
  }),
  isAuthRequired: PropTypes.bool,
  userEmail: PropTypes.string,
  userAvatarUrl: PropTypes.string,
  activeCityNumber: PropTypes.number,
  onSignIn: PropTypes.func.isRequired,
  onChooseCity: PropTypes.func.isRequired,
  leaflet: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    offers: filterOffersByCity(state),
    allOffers: state.allOffers,
    loading: getLoadingStatus(state),
    isAuthRequired: getAuthRequiredStatus(state),
    cities: getCities(state),
    activeCity: getActiveCity(state),
    activeCityNumber: getActiveCityNumber(state),
    userEmail: getUserEmail(state),
    userAvatarUrl: getUserAvatarUrl(state),
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
