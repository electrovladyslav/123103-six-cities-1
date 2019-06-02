import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withActiveElement = (Component) => {
  class WithActiveElement extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeElementNumber: this.props.activeElementNumber || 0,
      };
    }

    render() {
      return (
        <Component
          {...this.props}
          elements={this.props.elements}
          activeElementNumber={this.state.activeElementNumber}
          onElementActivate={(element) => {
            this.props.onElementActivate(element);
            this.setState({
              activeElementNumber: this.props.elements.indexOf(element),
            });
          }}
        />
      );
    }
  }

  WithActiveElement.propTypes = {
    onElementActivate: PropTypes.func.isRequired,
    elements: PropTypes.array.isRequired,
    activeElementNumber: PropTypes.number,
  };

  return WithActiveElement;
};

export default withActiveElement;
