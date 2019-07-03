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

      this.setRating = this.setRating.bind(this);
      this.setComment = this.setComment.bind(this);
      this.onSendReview = this.onSendReview.bind(this);
    }

    onSendReview(event) {
      this.props.onSendReview({
        rating: this.state.rating,
        comment: this.state.comment,
      });

      this.setState({isSubmitDisabled: true});
      event.preventDefault();
    }

    showError() {
      this.setState({isError: true});
    }

    setRating(event) {
      this.setState({rating: event.target.value});
      this.checkIsPossibleSubmit();
    }

    setComment(event) {
      this.setState({comment: event.target.value});
      this.checkIsPossibleSubmit();
    }

    checkIsPossibleSubmit() {
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

    render() {
      return (
        <Component
          {...this.props}
          onSubmit={this.onSendReview}
          setRating={this.setRating}
          setComment={this.setComment}
          isError={this.state.isError}
          isSubmitDisabled={this.state.isSubmitDisabled}
        />
      );
    }
  }

  WithReview.propTypes = {
    onSendReview: PropTypes.func.isRequired,
  };

  return WithReview;
};

export default withReview;
