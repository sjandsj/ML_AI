import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { UIColors } from '../utils/variables';

const style = StyleSheet.create({
  contextMenuButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 58,
    marginTop: 0.25,
    marginBottom: 0.25,
    backgroundColor: UIColors.newAppBackgroundColorBlack,
  },
  contextMenuButtonText: {
    fontSize: 16,
    color: UIColors.newAppDirtyYelloeColor,
  },
  contextMenuButtonTextAlt: {
    fontSize: 16,
    color: UIColors.newAppButtonGreenBackgroundColor,
  },
});

const ContextMenuButton = ({ text, altTextColor, action }) => (
  <TouchableOpacity
    style={style.contextMenuButton}
    onPress={() => action()}
  >
    <Text
      style={altTextColor ? style.contextMenuButtonTextAlt : style.contextMenuButtonText}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

ContextMenuButton.propTypes = {
  text: PropTypes.string,
  altTextColor: PropTypes.bool,
  action: PropTypes.func,
};

ContextMenuButton.defaultProps = {
  text: '',
  altTextColor: false,
  action: () => {},
};

export default ContextMenuButton;
