import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';
import Table from './Table';
import { UIColors } from '../../../utils/variables';

const styles = StyleSheet.create({
  playContainer: {
    flex: 1,
    // backgroundColor: UIColors.primaryText,
  },
});

const ResolvedPlay = props => (
  <View style={styles.playContainer}>
    <Table
      bets={props.bets}
      comboBets={props.comboBets}
      selectedTab={props.selectedTab}
      handleLoadMore={() => props.handleLoadMore()}
      handleLoadMoreComboBet={() => props.handleLoadMoreComboBet()}
      isPortrait={props.isPortrait}
      _handleRefresh={props._handleRefresh}
    />
  </View>
);

ResolvedPlay.propTypes = {
  bets: PropTypes.array,
  handleLoadMore: PropTypes.func,
  isPortrait: PropTypes.bool,
  _handleRefresh: PropTypes.func,
};

ResolvedPlay.defaultProps = {
  bets: [],
  handleLoadMore: () => {},
  isPortrait: true,
  _handleRefresh: () => {},
};

export default ResolvedPlay;

