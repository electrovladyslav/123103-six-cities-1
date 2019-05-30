import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withActiveElement = (Component) => {
  class WithActiveElement extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeElementNumber: 0,
      };

      this.elements = this.props.elements;
    }

    render() {
      return (
        <Component
          {...this.props}
          elements={this.elements}
          activeElementNumber={this.state.activeElementNumber}
          onElementClick={(element) => {
            this.props.onElementClick(element);
            this.setState({
              activeElementNumber: this.elements.indexOf(element),
            });
          }}
        />
      );
    }
  }

  WithActiveElement.propTypes = {
    onElementClick: PropTypes.func.isRequired,
    elements: PropTypes.array.isRequired,
  };

  return WithActiveElement;
};

export default withActiveElement;
