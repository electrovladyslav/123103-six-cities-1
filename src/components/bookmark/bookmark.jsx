import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {getAuthrizationStatus} from "../../selectors";
import {Operation} from "../../reducer";
import {BookmarkSize, RentCardClassesEnum} from "../../constants";

class Bookmark extends PureComponent {
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
    this.bookmarkClass = props.bookmarkClass || RentCardClassesEnum.RENT_CARD;
  }

  render() {
    const {isFavorite, isAuthorized} = this.props;
    return (
      <button
        className={`${this.bookmarkClass}__bookmark-button button ${
          isFavorite ? `${this.bookmarkClass}__bookmark-button--active` : ``
        }`}
        type="button"
        onClick={this._handleClick}>
        {this._renderFlag(isAuthorized)}
      </button>
    );
  }

  _handleClick(event) {
    if (this.props.isAuthorized) {
      const isAdding = this.props.isFavorite ? 0 : 1;
      this.props
        .postToFavorites(isAdding, this.props.offerId)
        .then(this.props.toggleFavoriteStatus(!!isAdding));
    }
    event.preventDefault();
  }

  _renderFlag(isAuthorized) {
    const bookmarkSize = this.props.bookmarkSize || BookmarkSize.NORMAL;

    if (isAuthorized) {
      return (
        <React.Fragment>
          <svg
            className={`${this.bookmarkClass}__bookmark-icon`}
            width={bookmarkSize.width}
            height={bookmarkSize.height}>
            <use xlinkHref="#icon-bookmark" />
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </React.Fragment>
      );
    } else {
      return (
        <Link to="/login">
          <svg
            className={`${this.bookmarkClass}__bookmark-icon`}
            width={bookmarkSize.width}
            height={bookmarkSize.height}>
            <use xlinkHref="#icon-bookmark" />
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </Link>
      );
    }
  }
}

Bookmark.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool,
  bookmarkSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  bookmarkClass: PropTypes.string,
  offerId: PropTypes.number,
  postToFavorites: PropTypes.func,
  toggleFavoriteStatus: PropTypes.func,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isAuthorized: getAuthrizationStatus(state),
  });

const mapDispatchToProps = (dispatch) => ({
  postToFavorites: (status, offerId) =>
    dispatch(Operation.postToFavorites(status, offerId)),
});

export {Bookmark};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bookmark);
