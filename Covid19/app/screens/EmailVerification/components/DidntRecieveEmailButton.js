import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { spacing } from '../../../utils/variables';

const styles = StyleSheet.create({
  didntReciveEmailButton: {
    marginTop: 130,
    borderBottomColor: 'rgb(0,65,124)',
    borderBottomWidth: spacing.border
  },
});

const DidntRecieveEmailButton = props => (
  <TouchableOpacity
    onPress={props.didntRecieveEmail}
    style={styles.didntReciveEmailButton}>
    <Text style={{color: 'rgb(0,65,124)'}}>
      I DIDN'T RECIEVE MY EMAIL!
    </Text>
  </TouchableOpacity>
);

DidntRecieveEmailButton.propTypes = {
  didntRecieveEmail: PropTypes.func,
};

DidntRecieveEmailButton.defaultProps = {
  didntRecieveEmail: ()=>{},
};
export default DidntRecieveEmailButton;
