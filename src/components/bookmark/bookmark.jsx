import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

class Bookmark extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {isFavorite, isAuthorized, bookmarkClass} = this.props;
    return (
      <button
        className={`${bookmarkClass}__bookmark-button button ${
          isFavorite ? `${bookmarkClass}__bookmark-button--active` : ``
        }`}
        type="button"
        onClick={this.props.onBookmarkClick}>
        {this._renderFlag(isAuthorized)}
      </button>
    );
  }

  _renderFlag(isAuthorized) {
    const {bookmarkSize, bookmarkClass} = this.props;

    if (isAuthorized) {
      return (
        <React.Fragment>
          <svg
            className={`${bookmarkClass}__bookmark-icon`}
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
            className={`${bookmarkClass}__bookmark-icon`}
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
  }).isRequired,
  bookmarkClass: PropTypes.string,
  onBookmarkClick: PropTypes.func,
};

export default Bookmark;
