import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import leaflet from "leaflet";

import {getAuthrizationStatus} from "../../selectors";
import {Operation, LoadingTypes} from "../../reducer";
import {
  filterOffersByCity,
  // getCities,
  // getActiveCity,
  getLoadingStatus,
  // getActiveCityNumber,
  // getAuthRequiredStatus,
  getUserEmail,
  getUserAvatarUrl,
} from "../../selectors";
import getNearestOffers from "../../utils/getNearestOffers";

import Header from "../header/header.jsx";
import Main from "../main/main.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import Favorites from "../favorites/favorites.jsx";
import RentPlace from "../rent-place/rent-place.jsx";
import MainEmpty from "../main-empty/main-empty.jsx";

import withPrivateRoutes from "../../hocs/with-private-routes/with-private-routes.jsx";
const FavoritesWrapped = withPrivateRoutes(Favorites);

const redirectToLogin = () => {
  return <Redirect to="/login" />;
};

const redirectToMain = () => {
  return <Redirect to="/" />;
};

const redirectToMainEmpty = () => {
  return <Redirect to="/main-empty" />;
};

const App = (props) => {
  const {allOffers, offers, userAvatarUrl, userEmail, loading} = props;

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
    return (
      <RentPlace
        offer={offer}
        offerId={offerId}
        nearestOffers={getNearestOffers(offer, offers)}
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
            <Main leaflet={leaflet} redirectToMainEmpty={redirectToMainEmpty} />
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
            />
          )}
        />
        <Route path="/offer/:id" component={SpecifiedRentPlace} />
        <Route path="/main-empty" component={MainEmpty} />
      </Switch>
    </React.Fragment>
  );
};

App.propTypes = {
  isAuthorized: PropTypes.bool,
  allOffers: PropTypes.array,
  offers: PropTypes.array,
  onSignIn: PropTypes.func.isRequired,
  userEmail: PropTypes.string,
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
});

export {App};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
