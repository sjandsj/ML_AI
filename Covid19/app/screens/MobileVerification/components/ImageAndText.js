import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { fontWeights, fontSizes, spacing } from '../../../utils/variables';

const styles = StyleSheet.create({
  viewForText: {
    // marginTop: 40,
     marginBottom: 40,
    alignSelf: 'flex-start'
  },
  bigText: {
    alignSelf: 'center',
    color: 'rgb(0, 218, 74)',
    fontSize: fontSizes.extraLarge,
    fontWeight: fontWeights.bold,
  },
  emailIcon: {
    marginTop: spacing.extraExtraLarge,
    height: 100,
    width: 100,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  smallText: {
    textAlign: 'left',
    color: 'white',
    fontSize: fontSizes.extraSmall,
  }
});

const ImageAndText = props => (
    <View style={styles.viewForText}>
      <Text style={styles.bigText}>
        Mobile number verification
      </Text>
      <Text style={styles.smallText}>
        We sent you a verification OTP code
      </Text>
      <Text style={styles.smallText} >
        {`on your mobile number : ${props.mobileNumber}`}
      </Text>
    </View>  
);

ImageAndText.propTypes = {
  mobileNumber: PropTypes.string,
};

ImageAndText.defaultProps = {
  mobileNumber: '',
};
export default ImageAndText;
