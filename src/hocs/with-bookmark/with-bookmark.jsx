import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import {BookmarkSize, RentCardClassesEnum} from "../../constants";
import {connect} from "react-redux";
import {getAuthrizationStatus} from "../../selectors";
import {Operation} from "../../reducer";

const withBookbark = (Component) => {
  class WithBookmark extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isFavorite: props.isFavorite,
      };

      this.bookmarkClass = props.bookmarkClass || RentCardClassesEnum.RENT_CARD;
      this.bookmarkSize = props.bookmarkSize || BookmarkSize.NORMAL;

      this.handleToggleFavoriteStatus = this.handleToggleFavoriteStatus.bind(
          this
      );
      this.handleClick = this.handleClick.bind(this);
    }

    handleToggleFavoriteStatus(isAdding) {
      this.setState({isFavorite: isAdding});
    }

    render() {
      return (
        <Component
          {...this.props}
          isAuthorized={this.props.isAuthorized}
          isFavorite={this.state.isFavorite}
          onBookmarkClick={this.handleClick}
          bookmarkClass={this.bookmarkClass}
          bookmarkSize={this.bookmarkSize}
        />
      );
    }

    handleClick(event) {
      if (this.props.isAuthorized) {
        const isAdding = this.props.isFavorite ? 0 : 1;
        this.props
          .postToFavorites(isAdding, this.props.offerId)
          .then(this.handleToggleFavoriteStatus(!!isAdding));
      }
      event.preventDefault();
    }
  }

  WithBookmark.propTypes = {
    isFavorite: PropTypes.bool,
    isAuthorized: PropTypes.bool,
    bookmarkSize: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    bookmarkClass: PropTypes.string,
    offerId: PropTypes.number,
    postToFavorites: PropTypes.func,
  };

  const mapStateToProps = (state, ownProps) =>
    Object.assign({}, ownProps, {
      isAuthorized: getAuthrizationStatus(state),
    });

  const mapDispatchToProps = (dispatch) => ({
    postToFavorites: (status, offerId) =>
      dispatch(Operation.postToFavorites(status, offerId)),
  });

  return connect(
      mapStateToProps,
      mapDispatchToProps
  )(WithBookmark);
};

export default withBookbark;
