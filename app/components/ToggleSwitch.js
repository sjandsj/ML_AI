import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../theme/colors';
import { UIColors } from '../utils/variables';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelStyle: {
    marginHorizontal: 10,
  },
});

export default class ToggleSwitch extends React.Component {
  static calculateDimensions(size) {
    switch (size) {
      case 'small':
        return ({
          width: 50, padding: 10, cercleWidth: 15, cercleHeight: 15, translateX: 22,
        });
      case 'large':
        return ({
          width: 100, padding: 20, cercleWidth: 30, cercleHeight: 30, translateX: 38,
        });
      default:
        return ({
          width: 60, padding: 12, cercleWidth: 28, cercleHeight: 28, translateX: 36,
        });
    }
  }

  static propTypes = {
    isOn: PropTypes.bool,
    label: PropTypes.string,
    onColor: PropTypes.string,
    offColor: PropTypes.string,
    size: PropTypes.string,
    labelStyle: PropTypes.object,
    onToggle: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isOn: false,
    // onColor: '#634fc9',
    // offColor: '#ecf0f1',
    onColor: UIColors.newAppDirtyGreenCOlor,
    offColor: UIColors.newAppBlackishColour,
    size: 'medium',
    labelStyle: {},
    label: '',
  }

  offsetX = new Animated.Value(0);
  dimensions = ToggleSwitch.calculateDimensions(this.props.size);

  createToggleSwitchStyle = () => ({
    justifyContent: 'center',
    width: this.dimensions.width,
    borderRadius: 20,
    padding: this.dimensions.padding,
    backgroundColor: (this.props.isOn) ? this.props.onColor : this.props.offColor,
    height: 30,
  })

  createInsideCercleStyle = () => ({
    margin: 4,
    position: 'absolute',
    // backgroundColor: colors.appBlackColor,
    borderColor: UIColors.newAppWhiteBorderColor,
    transform: [{ translateX: this.offsetX }],
    width: this.dimensions.cercleWidth,
    height: this.dimensions.cercleHeight,
    borderRadius: (this.dimensions.cercleWidth / 2),
  });

  render() {
    const toValue = this.props.isOn
      ? this.dimensions.width - this.dimensions.translateX
      : 0;

    Animated.timing(
      this.offsetX,
      {
        toValue,
        duration: 300,
      },
    ).start();

    return (
      <View style={styles.container}>
        {(this.props.label)
          ? <Text style={[styles.labelStyle, this.props.labelStyle]}>{this.props.label}</Text>
          : null
        }
        <TouchableOpacity
          style={this.createToggleSwitchStyle()}
          activeOpacity={0.8}
          onPress={() => {
            this.props.onToggle(!this.props.isOn);
          }}
        >
          <Animated.View style={this.createInsideCercleStyle()} />
        </TouchableOpacity>
      </View>
    );
  }
}
