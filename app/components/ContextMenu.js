import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { UIColors } from '../utils/variables';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: UIColors.newAppBackgroundColorBlack,
  },
  optionsView: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 10 : 30,
    paddingHorizontal: 10,
    flex: 1,
  },
  optionsListView: {
    marginBottom: 0,
  },
  buttonContainerWhite: {
    justifyContent: 'center',
    backgroundColor: UIColors.newAppBackgroundColorBlack,
  },
  buttonText: {
    fontSize: 16,
    alignSelf: 'center',
    color: UIColors.newAppDirtyYelloeColor,
  },
  cancelButton: {
    flex: 1,
    height: 55,
    justifyContent: 'center',
    backgroundColor: UIColors.newAppBackgroundColorBlack,
  },
  showPopupContainer: {
    position: 'absolute',
    flex: 1,
  },
});

const ContextMenu = ({ children, cancelButtonAction }) => (
  <View style={[styles.showPopupContainer, { width: Dimensions.get('window').width, height: Dimensions.get('window').height }]}>
    <View style={styles.optionsView}>
      <View style={[styles.optionsListView]}>
        <View style={[styles.buttonContainerWhite, { width: Dimensions.get('window').width - 20 }]}>
          {children}
        </View>
      </View>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => cancelButtonAction()}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>

);

ContextMenu.propTypes = {
  children: PropTypes.node.isRequired,
  cancelButtonAction: PropTypes.func.isRequired,
};

export default ContextMenu;
