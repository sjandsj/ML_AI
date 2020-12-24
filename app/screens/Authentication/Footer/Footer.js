import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { UIColors } from '../../../utils/variables';
import Footer from './Components/Footer';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
  },
});

const FooterContainer = props => (
  <View style={styles.container}>
    <Footer
      openPrivacyPolicy={props.openPrivacyPolicy}
      openTermOfUse={props.openTermOfUse}
      openRules={props.openRules}
    />
  </View>
);


FooterContainer.propTypes = {
  openPrivacyPolicy: PropTypes.func,
  openTermOfUse: PropTypes.func,
  openRules: PropTypes.func,
};

FooterContainer.defaultProps = {
  openPrivacyPolicy: () => {},
  openTermOfUse: () => {},
  openRules: () => {},
};


export default FooterContainer;
