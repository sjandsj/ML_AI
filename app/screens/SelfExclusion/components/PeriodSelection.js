
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { UIColors, fontSizes, spacing, fontName } from '../../../utils/variables';
import { selfExclusionLocalizeString } from '../../../localization/selfExclusionLocalizeString';
import CheckBoxSelectionList from './CheckBoxSelectionList';
import YellowButton from './YellowButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.secondary,
  },
  content: {
    paddingHorizontal: spacing.large,
    flex: 1,
  },
  textStyle: {
    fontFamily: fontName.sourceSansProRegular,
    color: UIColors.defaultWhite,
    fontSize: fontSizes.small,
    paddingVertical: spacing.small,
  },
  yellowButtonView: {
    marginHorizontal: spacing.large,
    flex: 1,
    alignSelf: 'center',
  },
});

class PeriodSelection extends Component {
  constructor(props) {
    super(props);
    // this.state.selectedItem = null;
    this.state = {
      selectedItem: '',
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.textStyle}>
            {selfExclusionLocalizeString.selectPeriod}:
          </Text>
          <CheckBoxSelectionList
            list={this.props.periodList}
            onSelectItem={(item) => {
              this.setState({ selectedItem: item });
            }}
            isPortrait={this.props.isPortrait}
            selectedItem={this.state.selectedItem}
          />
          <View style={[styles.yellowButtonView, { justifyContent: this.props.isPortrait ? 'flex-start' : 'center' }]}>
            <YellowButton
              isDisabled={_.isEmpty(this.state.selectedItem)}
              onPress={() => {
                this.props.onPressContinue(this.state.selectedItem);
              }}
              title={selfExclusionLocalizeString.continue}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

PeriodSelection.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  onPressContinue: PropTypes.func,
  periodList: PropTypes.array,
  isPortrait: PropTypes.bool,
};

PeriodSelection.defaultProps = {
  navigation: {},
  onPressContinue: () => { },
  periodList: [],
  isPortrait: false,
};

export default PeriodSelection;
