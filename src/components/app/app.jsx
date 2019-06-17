import React from "react";
import PropTypes from "prop-types";
import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import leaflet from "leaflet";

import {getAuthrizationStatus} from "../../selectors";

import Main from "../main/main.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import Favorites from "../favorites/favorites.jsx";

import withPrivateRoutes from "../../hocs/with-private-routes/with-private-routes.jsx";
const FavoritesWrapped = withPrivateRoutes(Favorites);

const handleClick = (event) => {
  console.log(`The link was clicked.`); // eslint-disable-line no-console
  event.preventDefault();
};

const App = (props) => {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => <Main onCardTitleClick={handleClick} leaflet={leaflet} />}
      />
      <Route path="/login" component={SignIn} />
      <Route path="/favorites" render={() => <FavoritesWrapped isAuthorized={props.isAuthorized} />} />
    </Switch>
  );
};

App.propTypes = {
  isAuthorized: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isAuthorized: getAuthrizationStatus(state),
  });

const mapDispatchToProps = () => ({
});

export {App};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
