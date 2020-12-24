import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import CustomButton from '../../../../components/CustomButton';
import { authenticationLocalizedString } from '../../../../localization/authenticationLocalizeStrings';
import { UIColors, fontName, spacing, fontSizes, itemSizes } from '../../../../utils/variables';
import CustomText from '../../../../components/CustomText';
import { images } from '../../../../assets/images';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    alignItems: 'center',
  },
  pageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: spacing.extraSmall,
  },
  footerViewStyle: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.extraSmall,
  },
  headerTabsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: spacing.extraExtraSmall,
    marginTop: spacing.extraExtraSmall,
    alignItems: 'center',

  },
  headerTabsTextStyle: {
    fontSize: fontSizes.extraSmall,
    color: UIColors.primaryText,
    paddingRight: spacing.extraSmall,
    paddingLeft: spacing.extraSmall,
    fontFamily: fontName.sourceSansProRegular,
  },
  headerTabsTextStyleRight: {
    fontSize: fontSizes.extraSmall,
    color: UIColors.primaryText,
    paddingRight: spacing.extraSmall,
    paddingLeft: spacing.extraSmall,
    fontFamily: fontName.sourceSansProRegular,
  },
  alignTextLeft: {
    alignSelf: 'flex-start',
  },
  alignTextRight: {
    alignSelf: 'flex-end',
  },
  plusEighteenIconStyle: {
    height: itemSizes.iconLarge,
    width: itemSizes.iconLarge,
    tintColor: UIColors.disableText,
  },
});

const Footer = props => (
  <View style={styles.container}>
    <View style={styles.pageContainer}>
      <CustomButton
        buttonStyle={styles.headerTabsStyle}
        onPress={() => props.openPrivacyPolicy()}
        buttonTitle={authenticationLocalizedString.privacyPolicy}
        textStyle={styles.headerTabsTextStyleRight}
      />
      <CustomButton
        buttonStyle={styles.headerTabsStyle}
        onPress={() => props.openTermOfUse()}
        buttonTitle={authenticationLocalizedString.termsOfUse}
        textStyle={styles.headerTabsTextStyleRight}
      />
      <CustomButton
        buttonStyle={styles.headerTabsStyle}
        onPress={() => props.openRules()}
        buttonTitle={authenticationLocalizedString.rules}
        textStyle={styles.headerTabsTextStyleRight}
      />
    </View>
    <View style={styles.headerTabsStyle}>
      <Text style={styles.headerTabsTextStyleRight}>Bwinner© 2019-2020</Text>
      <Image source={images.plusEighteenIcon} style={styles.plusEighteenIconStyle} />
    </View>
  </View>
);

Footer.propTypes = {
  openScreen: PropTypes.func,
  openPrivacyPolicy: PropTypes.func,
};

Footer.defaultProps = {
  openScreen: () => {},
  openPrivacyPolicy: () => {},
};

export default Footer;
