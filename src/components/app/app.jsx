import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import leaflet from "leaflet";

import {getAuthrizationStatus} from "../../selectors";
import {Operation, LoadingTypes} from "../../reducer";
import {
  filterOffersByCity,
  getLoadingStatus,
  getUserEmail,
  getUserAvatarUrl,
} from "../../selectors";
import getNearestOffers from "../../utils/get-nearest-offers";

import Header from "../header/header.jsx";
import Main from "../main/main.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import Favorites from "../favorites/favorites.jsx";
import RentPlace from "../rent-place/rent-place.jsx";
import MainEmpty from "../main-empty/main-empty.jsx";

import withPrivateRoutes from "../../hocs/with-private-routes/with-private-routes.jsx";
import withActiveElement from "../../hocs/with-active-element/with-active-element.jsx";
import withFavorites from "../../hocs/with-favorites/with-favorites.jsx"

const FavoritesWrapped = withPrivateRoutes(withFavorites(Favorites));

const redirectToLogin = () => {
  return <Redirect to="/login" />;
};

const redirectToMain = () => {
  return <Redirect to="/" />;
};

const redirectToMainEmpty = () => {
  return <Redirect to="/main-empty" />;
};

const MainWrapped = withActiveElement(Main);

const App = (props) => {
  const {
    allOffers,
    offers,
    userAvatarUrl,
    userEmail,
    loading,
    loadFavorites,
  } = props;

  switch (loading) {
    case LoadingTypes.LOAD_FAIL:
      return `Something going wrong, please reload the page.`;

    case LoadingTypes.START_LOADING:
      return `Please wait for data loading.`;

    case LoadingTypes.END_LOADING:
    default:
      break;
  }

  const SpecifiedRentPlace = (req) => {
    const offerId = +req.match.params.id;
    const offer = allOffers.find((currentOffer) => currentOffer.id === offerId);
    const nearOffers = allOffers.filter(
        (currentOffer) => currentOffer.city.name === offer.city.name
    );
    return (
      <RentPlace
        offer={offer}
        offerId={offerId}
        nearestOffers={getNearestOffers(offer, nearOffers)}
        leaflet={leaflet}
      />
    );
  };

  return (
    <React.Fragment>
      <Header userAvatarUrl={userAvatarUrl} userEmail={userEmail} />
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <MainWrapped
              elements={offers}
              leaflet={leaflet}
              redirectToMainEmpty={redirectToMainEmpty}
            />
          )}
        />
        <Route
          path="/login"
          render={() => (
            <SignIn
              isAuthorized={props.isAuthorized}
              redirectToMain={redirectToMain}
              onSignIn={props.onSignIn}
            />
          )}
        />
        <Route
          path="/favorites"
          render={() => (
            <FavoritesWrapped
              isAuthorized={props.isAuthorized}
              redirectToLogin={redirectToLogin}
              loadFavorites={loadFavorites}
            />
          )}
        />
        <Route path="/offer/:id" component={SpecifiedRentPlace} />
        <Route path="/main-empty" component={MainEmpty} />
        <Route
          path=""
          render={() => (
            <h1 style={{textAlign: `center`}}>Oops! 404! Page not found.</h1>
          )}
        />
      </Switch>
    </React.Fragment>
  );
};

App.propTypes = {
  isAuthorized: PropTypes.bool,
  allOffers: PropTypes.array,
  offers: PropTypes.array,
  onSignIn: PropTypes.func.isRequired,
  loadFavorites: PropTypes.func,
  userEmail: PropTypes.string.isRequired,
  userAvatarUrl: PropTypes.string,
  loading: PropTypes.string,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isAuthorized: getAuthrizationStatus(state),
    offers: filterOffersByCity(state),
    allOffers: state.allOffers,
    userEmail: getUserEmail(state),
    userAvatarUrl: getUserAvatarUrl(state),
    loading: getLoadingStatus(state),
  });

const mapDispatchToProps = (dispatch) => ({
  onSignIn: (email, password) => {
    event.preventDefault();
    dispatch(
        Operation.authorize({
          email,
          password,
        })
    );

    redirectToMain();
  },

  loadFavorites: () => {
    return dispatch(Operation.loadFavorites());
  },
});

export {App};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
