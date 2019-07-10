import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withSorting = (Component) => {
  class WithSorting extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isOpen: props.isOpen || false,
        activeSortingVariant:
          props.sortingVariants[Object.keys(props.sortingVariants)[0]],
      };

      this.handleSortingMenuToggle = this.handleSortingMenuToggle.bind(this);
      this.handleChooseVariant = this.handleChooseVariant.bind(this);
    }

    handleSortingMenuToggle() {
      this.setState({isOpen: !this.state.isOpen});
    }

    handleChooseVariant(variant) {
      this.setState({activeSortingVariant: variant, isOpen: false});
    }

    render() {
      return (
        <Component
          {...this.props}
          isSortingMenuOpen={this.state.isOpen}
          onSortingMenuToggle={this.handleSortingMenuToggle}
          onChooseVariant={this.handleChooseVariant}
          activeSortingVariant={this.state.activeSortingVariant}
        />
      );
    }
  }

  WithSorting.propTypes = {
    isOpen: PropTypes.bool,
    sortingVariants: PropTypes.object,
  };

  return WithSorting;
};

export default withSorting;
