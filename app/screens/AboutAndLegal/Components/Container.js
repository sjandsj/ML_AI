import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Header from '../../../components/Header';
import { aboutAndLegalLocalizeString } from '../../../localization/aboutAndLegalLocalizeString';
import { UIColors, fontSizes, spacing, fontName, fontWeights } from '../../../utils/variables';
import { authenticationLocalizedString } from '../../../localization/authenticationLocalizeStrings';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: UIColors.primaryText,
  },
  contentView: {
  },
  versionView: {
    paddingVertical: spacing.large,
    paddingHorizontal: spacing.small,
    borderBottomWidth: 2,
    borderBottomColor: UIColors.placeHolderColor,
  },
  textStyle: {
    color: UIColors.secondaryText,
    fontSize: fontSizes.medium,
    fontWeight: fontWeights.bold,
    // fontFamily: fontName.sourceSansProSemiBold,
  },
  disabledTextStyle: {
    color: UIColors.disableText,
    fontSize: fontSizes.small,
    fontFamily: fontName.sourceSansProRegular,
  },
  touchableOpacity: {
    paddingLeft: spacing.extraExtraLarge,
  },
});

const AboutAndLegalContainer = props => (
  <View style={styles.mainContainer}>
    <Header
      title="About Us"
      showBackButton
      backButtonAction={props.backButtonAction}
    />
    <View style={styles.contentView}>
      <View style={styles.versionView}>
        <TouchableOpacity style={styles.touchableOpacity} onPress={() => props.openPrivacyPolicy()}>
          <Text style={styles.textStyle}>
            {authenticationLocalizedString.privacyPolicy}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.versionView}>
        <TouchableOpacity style={styles.touchableOpacity} onPress={() => props.openTermOfUse()}>
          <Text style={styles.textStyle}>
            {authenticationLocalizedString.termsOfUse}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.versionView}>
      <TouchableOpacity style={styles.touchableOpacity} onPress={() => props.openRules()}>
        <Text style={styles.textStyle}>
          {authenticationLocalizedString.rules}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

AboutAndLegalContainer.propTypes = {
  openPrivacyPolicy: PropTypes.func,
  openTermOfUse: PropTypes.func,
  openRules: PropTypes.func,
  backButtonAction: PropTypes.func,
};

AboutAndLegalContainer.defaultProps = {
  openPrivacyPolicy: () => {},
  openTermOfUse: () => {},
  openRules: () => {},
  backButtonAction: () => {},
};

export default AboutAndLegalContainer;
