import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { fontSizes, UIColors, fontName, spacing } from '../../../utils/variables';

const styles = StyleSheet.create({
  upperHeaderTitle: {
    fontSize: fontSizes.medium,
    fontFamily: fontName.sourceSansProSemiBold,
    color: UIColors.primaryText,
  },
});

const TournamentFilterTypeButton = props => (
  <TouchableOpacity
    onPress={() => props.onPress()}
    style={{ paddingVertical: spacing.small }}
  >
    <Text style={[styles.upperHeaderTitle,
      { color: props.isSelected ? UIColors.focused : UIColors.primaryText }]}
    >{props.title}
    </Text>
  </TouchableOpacity>
);

TournamentFilterTypeButton.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  isSelected: PropTypes.bool,
};

TournamentFilterTypeButton.defaultProps = {
  onPress: () => {},
  title: '',
  isSelected: false,
};

export default TournamentFilterTypeButton;
