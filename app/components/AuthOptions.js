import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import { images } from '../assets/images';
import { isPortrait } from '../utils/utils';
import { UIColors, fontName, fontSizes, itemSizes, spacing } from '../utils/variables';

const widthInput = '96%';

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
  },
  containerLandscape: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.medium,
  },
  socialButton: {
    flex: 1,
  },
  socialButtonLandscape: {
    flex: 2,
  },
  socialButtonCommon: {
    marginTop: spacing.extraExtraSmall,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  displayText: {
    fontSize: fontSizes.small,
    color: UIColors.placeholderText,
    marginLeft: spacing.semiMedium,
    fontFamily: fontName.SourceSansProRegular,
  },
  socialCustonButton: {
    height: itemSizes.defaultSmallButtonHeight,
    width: itemSizes.defaultSmallButtonHeight,
    margin: spacing.extraSmall,
  },
  authButtonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authButton: {
    backgroundColor: UIColors.focused,
    height: itemSizes.defaultButtonHeight,
    width: widthInput,
    borderRadius: spacing.extraSmall,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: spacing.extraExtraSmall,

  },
  authButtonText: {
    color: UIColors.primary,
    fontSize: fontSizes.medium,
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: fontName.SourceSansProSemiBold,
  },
  socialButtonView: {
    flexDirection: 'row',
    marginRight: spacing.extraSmall,
  },
  socialLoginButton: {
    height: itemSizes.defaultSmallButtonHeight,
    width: itemSizes.defaultSmallButtonHeight,
  },
});

const AuthOptions = props => (
  <View style={isPortrait(props.screenOrientation)
    ? styles.container
    : styles.containerLandscape}
  >
    <View style={isPortrait(props.screenOrientation) ?
      [styles.socialButton, styles.socialButtonCommon]
      : [styles.socialButtonLandscape, styles.socialButtonCommon]}
    >
      {/* <CustomText title={props.title} textStyle={styles.displayText} /> */}
      {/* <View style={styles.socialButtonView}>
        <CustomButton
          buttonStyle={styles.socialCustonButton}
          backgroundImage={images.facebookIcon}
          imageStyle={styles.socialLoginButton}
          onPress={() => props.facebookAction()}

        />
        <CustomButton
          buttonStyle={styles.socialCustonButton}
          backgroundImage={images.googleIcon}
          imageStyle={styles.socialLoginButton}
          onPress={() => props.googleAction()}
        />
      </View> */}
    </View>
    <View style={styles.authButtonView}>
      <CustomButton
        buttonStyle={styles.authButton}
        // buttonStyle={{backgroundColor: 'red', height: 40, width: '100%', textAlign: 'center' }}
        onPress={() => props.userAction()}
        buttonTitle={props.buttonTitle}
        textStyle={styles.authButtonText}
      />
    </View>
  </View>
);

AuthOptions.propTypes = {
  textStyle: PropTypes.object,
  title: PropTypes.string,
  facebookAction: PropTypes.func,
  googleAction: PropTypes.func,
  userAction: PropTypes.func,
  screenOrientation: PropTypes.string,
  buttonTitle: PropTypes.string,

};

AuthOptions.defaultProps = {
  textStyle: {},
  title: '',
  facebookAction: () => {},
  googleAction: () => {},
  userAction: () => {},
  screenOrientation: '',
  buttonTitle: '',
};


export default AuthOptions;
