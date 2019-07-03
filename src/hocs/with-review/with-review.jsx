import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import {ReviewConstants} from "../../constants";

const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 0,
        comment: ``,
        isError: false,
        isSubmitDisabled: true,
      };

      this.handleSetRating = this.handleSetRating.bind(this);
      this.handleSetComment = this.handleSetComment.bind(this);
      this.handleSendReview = this.handleSendReview.bind(this);
    }

    handleSendReview(event) {
      this.props
        .onSendReview({
          rating: this.state.rating,
          comment: this.state.comment,
        })
        .then((response) => {
          if (response) {
            this._clearForm();
            this._hideError();
          } else {
            this.setState({isSubmitDisabled: false});
            this._showError();
          }
        });

      this.setState({isSubmitDisabled: true});
      event.preventDefault();
    }

    _clearForm() {
      this.setState({
        comment: ``,
      });
    }

    _showError() {
      this.setState({isError: true});
    }

    _hideError() {
      this.setState({isError: false});
    }

    handleSetRating(event) {
      this.setState({
        rating: event.target.value,
      });
      this._checkIsPossibleSubmit();
    }

    handleSetComment(event) {
      this.setState({
        comment: event.target.value,
      });
      this._checkIsPossibleSubmit();
    }

    render() {
      return (
        <Component
          {...this.props}
          textareaValue={this.state.comment}
          onSubmit={this.handleSendReview}
          onSetRating={this.handleSetRating}
          onSetComment={this.handleSetComment}
          isError={this.state.isError}
          isSubmitDisabled={this.state.isSubmitDisabled}
        />
      );
    }

    _checkIsPossibleSubmit() {
      if (
        this.state.comment.length <= ReviewConstants.MAX_CHARACTERS &&
        this.state.comment.length > ReviewConstants.MIN_CHARACTERS &&
        this.state.rating > 0
      ) {
        this.setState({isSubmitDisabled: false});
      } else {
        this.setState({isSubmitDisabled: true});
      }
    }
  }

  WithReview.propTypes = {
    onSendReview: PropTypes.func.isRequired,
  };

  return WithReview;
};

export default withReview;
