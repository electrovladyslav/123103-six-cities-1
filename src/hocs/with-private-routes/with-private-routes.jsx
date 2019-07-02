import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withPrivateRoutes = (Component) => {
  class WithPrivateRoutes extends PureComponent {
    constructor(props) {
      super(props);
    }

    render() {
      if (this.props.isAuthorized) {
        return <Component {...this.props} />;
      } else {
        return this.props.redirectToLogin();
      }
    }
  }

  WithPrivateRoutes.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
    redirectToLogin: PropTypes.func.isRequired,
  };

  return WithPrivateRoutes;
};

export default withPrivateRoutes;
