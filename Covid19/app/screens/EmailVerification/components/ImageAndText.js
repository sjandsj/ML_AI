import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { fontWeights, fontSizes, spacing } from '../../../utils/variables';

const styles = StyleSheet.create({
  viewForText: {
    marginTop: 40,
    marginBottom: 40,
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
});

const ImageAndText = props => (
  <View>
    <Image
      // source={props.emailIcon}
      style={styles.emailIcon} />
    <View style={styles.viewForText}>
      <Text style={styles.bigText}>
        Check Your Email  
      </Text>
      <Text
        numberOfLines={2}
        style={{ textAlign: 'center', color: 'rgb(47,77,125)'}} >
        {`We've send you an email to email@email.com. You'll recieve link that will sign you to koorapay!`}
      </Text> 
    </View>
  </View>
  
);

ImageAndText.propTypes = {
  emailIcon: PropTypes.object,
};

ImageAndText.defaultProps = {
  emailIcon: {},
};
export default ImageAndText;
