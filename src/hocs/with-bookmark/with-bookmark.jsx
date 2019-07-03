import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withBookbark = (Component) => {
  class WithBookmark extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isFavorite: props.isFavorite,
      };

      this.handleToggleFavoriteStatus = this.handleToggleFavoriteStatus.bind(this);

    }

    handleToggleFavoriteStatus(isAdding) {
      this.setState({isFavorite: isAdding});
    }

    render() {
      return (
        <Component
          {...this.props}
          isFavorite={this.state.isFavorite}
          onToggleFavoriteStatus={this.handleToggleFavoriteStatus}
        />
      );
    }
  }
  WithBookmark.propTypes = {
    isFavorite: PropTypes.bool,
  };

  return WithBookmark;
};

export default withBookbark;
