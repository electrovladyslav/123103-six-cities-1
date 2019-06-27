import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import leaflet from "leaflet";

import {getAuthrizationStatus} from "../../selectors";
import {Operation} from "../../reducer";

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
  const {allOffers} = props;

  const SpecifiedRentPlace = (req) => {
    const offerId = +req.match.params.id;
    const offer = allOffers.find((currentOffer) => currentOffer.id === offerId);
    return <RentPlace offer={offer} />;
  };

  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => <Main leaflet={leaflet} />}
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
      <Route
        path="/offer/:id"
        component={SpecifiedRentPlace}
      />
    </Switch>
  );
};

App.propTypes = {
  isAuthorized: PropTypes.bool,
  allOffers: PropTypes.array,
  onSignIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isAuthorized: getAuthrizationStatus(state),
    allOffers: state.allOffers,
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
