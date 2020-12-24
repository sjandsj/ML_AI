import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { images } from '../assets/images';
import { UIColors } from '../utils/variables';

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 40,
  },
  backButton: {
    width: 25,
    height: 25,
    tintColor: UIColors.defaultWhite,
  },
});

const BackButton = props => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={props.backButtonAction}
    >
      <Image
        source={images.leftArrow}
        style={styles.backButton}
        resizeMode="contain"
      />
    </TouchableOpacity>
  </View>
);

BackButton.propTypes = {
  backButtonAction: PropTypes.func,
};

BackButton.defaultProps = {
  backButtonAction: () => {},
};

export default BackButton;
