/**
* @providesModule TouchableHold
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
} from 'react-native';

class TouchableHold extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      isPressed: false,
    };
  }

  componentWillUnmount() {
    if (this.timer !== null) {
      clearInterval(this.timer);
    }
  }

  onPress() {
    this.setState({ isPressed: true }, () => {
      this.props.onTouch();
      this.holdButton();
    });
  }

  holdButton() {
    if (this.state.isPressed) {
      this.timer = setTimeout(() => {
        this.setState({ isPressed: !this.state.isPressed });
      }, 2000);
    }
  }

  render() {
    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        {...this.props}
        onPress={() => !this.state.isPressed && this.onPress()}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

TouchableHold.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any, PropTypes.array, PropTypes.object]),
  onTouch: PropTypes.func,
  disabled: PropTypes.bool,
};

TouchableHold.defaultProps = {
  children: {},
  onTouch: () => {},
  disabled: false,
};

export default TouchableHold;
