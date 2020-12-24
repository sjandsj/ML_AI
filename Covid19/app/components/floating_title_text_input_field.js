import React, { Component } from 'react';
import { View, Animated, StyleSheet, TextInput, Image } from 'react-native';
import { string, func, object, number } from 'prop-types';
import { images } from '../assets/images';

export class FloatingTitleTextInputField extends Component {
  static propTypes = {
    attrName: string.isRequired,
    title: string.isRequired,
    value: string.isRequired,
    updateMasterState: func.isRequired,
    keyboardType: string,
    titleActiveSize: number, // to control size of title when field is active
    titleInActiveSize: number, // to control size of title when field is inactive
    titleActiveColor: string, // to control color of title when field is active
    titleInactiveColor: string, // to control color of title when field is active
    textInputStyles: object,
    otherTextInputProps: object,
    isShowLeftIcon: false,
  }

  
  static defaultProps = {
    keyboardType: 'default',
    titleActiveSize: 11.5,
    titleInActiveSize: 15,
    titleActiveColor: 'black',
    titleInactiveColor: 'dimgrey',
    textInputStyles: {}, 
    otherTextInputAttributes: {},
  }

  constructor(props) {
    super(props);
    const { value } = this.props;
    this.position = new Animated.Value(value ? 1 : 0);
    this.state = {
      isFieldActive: false,
    }
  }

  _handleFocus = () => {
    if (!this.state.isFieldActive) {
      this.setState({ isFieldActive: true });
      Animated.timing(this.position, {
        toValue: 1,
        duration: 150,
      }).start();
    }
  }

  _handleBlur = () => {
    if (this.state.isFieldActive && !this.props.value) {
      this.setState({ isFieldActive: false });
      Animated.timing(this.position, {
        toValue: 0,
        duration: 150,
      }).start();
    }
  }

  _onChangeText = (updatedValue) => {
    const { attrName, updateMasterState } = this.props; 
    updateMasterState(attrName, updatedValue);
  }

  _returnAnimatedTitleStyles = () => {
    const { isFieldActive } = this.state;
    const {
      titleActiveColor, titleInactiveColor, titleActiveSize, titleInActiveSize
    } = this.props;
  
    return {
      top: this.position.interpolate({
        inputRange: [0, 3],
        outputRange: [14, 0],
      }),
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
      color: isFieldActive ? titleActiveColor : titleInactiveColor,
    }
  }

  render() {
    return (
      <View style = {Styles.container}>
        <Animated.Text
          style = {[Styles.titleStyles, this._returnAnimatedTitleStyles()]}
        >
          {this.props.title}
        </Animated.Text>
        {this.props.isShowLeftIcon &&
        <Image style={Styles.icon} source={images.logo} />
        }
        <TextInput
          value = {this.props.value}
          style = {[Styles.textInput, this.props.textInputStyles]}
          underlineColorAndroid = 'transparent'
          onFocus = {this._handleFocus}
          onBlur = {this._handleBlur}
          onChangeText = {this._onChangeText}
          keyboardType = {this.props.keyboardType}
          {...this.props.otherTextInputProps}
        />
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 0.5,
    height: 60,
    marginVertical: 4,
    backgroundColor: 'red',
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
  },
  textInput: {
    fontSize: 15,
    marginTop: 10,
    width: '100%',
    fontFamily: 'Avenir-Medium',
    color: 'black',
    // backgroundColor: 'blue',
  },
  titleStyles: {
    position: 'absolute',
    fontFamily: 'Avenir-Medium',
    left: 3,
    left: 4,
  },
  icon: {
    width: 20,
    height: 20,
    // marginTop: 30,
    // marginHorizontal: 5,
    resizeMode: 'cover',
  },
})