import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import {SignIn} from "../../components/sign-in/sign-in.jsx";

const withPrivateRoutes = (Component) => {
  class WithPrivateRoutes extends PureComponent {
    constructor(props) {
      super(props);
    }

    render() {
      return this.props.isAuthorized ? <Component /> : <SignIn />;
    }
  }

  WithPrivateRoutes.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
  };

  return WithPrivateRoutes;
};

export default withPrivateRoutes;

