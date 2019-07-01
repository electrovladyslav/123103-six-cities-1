import React from "react";
import PropTypes from "prop-types";

const withActiveElement = (Component) => {
  class WithActiveElement extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        activeElement: this.props.activeElement,
      };

      this.handleElementActivate = this.handleElementActivate.bind(this);
      this.eriseActiveElement = this.eriseActiveElement.bind(this);
    }

    handleElementActivate(element) {
      if (this.props.onElementActivate) {
        this.props.onElementActivate(element);
      }
      this.setState({
        activeElement: element,
      });
    }

    eriseActiveElement() {
      this.setState({
        activeElement: null,
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          elements={this.props.elements}
          activeElement={this.state.activeElement}
          onElementActivate={this.handleElementActivate}
          eriseActiveElement={this.eriseActiveElement}
        />
      );
    }
  }

  WithActiveElement.propTypes = {
    onElementActivate: PropTypes.func,
    elements: PropTypes.array.isRequired,
    activeElement: PropTypes.object,
  };

  return WithActiveElement;
};

export default withActiveElement;
