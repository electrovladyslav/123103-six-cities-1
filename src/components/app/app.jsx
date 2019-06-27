import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import leaflet from "leaflet";

import {getAuthrizationStatus} from "../../selectors";
import {Operation, LoadingTypes} from "../../reducer";
import {
  // filterOffersByCity,
  // getCities,
  // getActiveCity,
  getLoadingStatus,
  // getActiveCityNumber,
  // getAuthRequiredStatus,
  getUserEmail,
  getUserAvatarUrl,
} from "../../selectors";

import Header from "../header/header.jsx";
import Main from "../main/main.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import Favorites from "../favorites/favorites.jsx";
import RentPlace from "../rent-place/rent-place.jsx";

import withPrivateRoutes from "../../hocs/with-private-routes/with-private-routes.jsx";
const FavoritesWrapped = withPrivateRoutes(Favorites);

const redirectToLogin = () => {
  return <Redirect to="/login" />;
};

const redirectToMain = () => {
  return <Redirect to="/" />;
};

const App = (props) => {
  const {allOffers, userAvatarUrl, userEmail, loading} = props;

  switch (loading) {
    case LoadingTypes.LOAD_FAIL:
      return `Что-то пошло не так, перезагрузите страницу.`;

    case LoadingTypes.START_LOADING:
      return `Ожидайте загрузки данных.`;

    case LoadingTypes.END_LOADING:
    default:
      break;
  }

  const SpecifiedRentPlace = (req) => {
    const offerId = +req.match.params.id;
    const offer = allOffers.find((currentOffer) => currentOffer.id === offerId);
    return <RentPlace offer={offer} />;
  };

  return (
    <React.Fragment>
      <Header userAvatarUrl={userAvatarUrl} userEmail={userEmail} />
      <Switch>
        <Route path="/" exact render={() => <Main leaflet={leaflet} />} />
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
      </Switch>
    </React.Fragment>
  );
};

App.propTypes = {
  isAuthorized: PropTypes.bool,
  allOffers: PropTypes.array,
  onSignIn: PropTypes.func.isRequired,
  userEmail: PropTypes.string,
  userAvatarUrl: PropTypes.string,
  loading: PropTypes.string,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isAuthorized: getAuthrizationStatus(state),
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
