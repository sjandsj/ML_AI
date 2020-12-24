import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { spacing } from '../../../utils/variables';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.large,
  },
});

const DidntRecieveCodeButton = props => (
  <View style={styles.container}>
    <Text style={{color: 'white'}}>
      If you didn't recieve the code.&nbsp; &nbsp;
    </Text>
    <TouchableOpacity
      onPress={props.didntRecieveEmail}
      style={styles.didntReciveEmailButton}>
      <Text style={{color: 'rgb(0,218,81)'}}>
        Resend
      </Text>
    </TouchableOpacity>
  </View>
  
);

DidntRecieveCodeButton.propTypes = {
  didntRecieveEmail: PropTypes.func,
};

DidntRecieveCodeButton.defaultProps = {
  didntRecieveEmail: ()=>{},
};
export default DidntRecieveCodeButton;
