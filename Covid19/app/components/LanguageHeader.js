import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { images } from '../assets/images';
import { UIColors, spacing, fontSizes } from '../utils/variables';

const styles = StyleSheet.create({
  logoView:{
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    width: '100%',
    marginTop: spacing.medium,
    marginBottom: spacing.medium,
  },
  appLogo: {
    height: 30,
    width: 140,
    backgroundColor: 'rgb(1, 29, 90)',
  },
  dropDownView: {
    height: 30,
    width: 60,
    backgroundColor: 'rgb(1, 29, 90)',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: spacing.extraSmall,
    justifyContent: 'space-around',
    padding: spacing.small,
  },
});

const LanguageHeader = props => (
  <View style={styles.logoView}>
    <Image
      // source={images.logo}
      style={styles.appLogo}
    />
    { props.showLangDropdown &&
      <TouchableOpacity
        style={styles.dropDownView}
        onPress={props.langDropdownPressed}
      >
        <Image
          source={images.logo}
          style={{ height: 10, width: 10}}
        />
        <Text style={{fontSize: fontSizes.tiny, color: UIColors.appBackGroundColor}}>
          En  ^
        </Text>
      </TouchableOpacity>
    }
  </View>
);

LanguageHeader.propTypes = {
  langDropdownPressed: PropTypes.func,
  showLangDropdown: PropTypes.bool,
};

LanguageHeader.defaultProps = {
  showLangDropdown: false,
  langDropdownPressed: () => {},
};
export default LanguageHeader;
