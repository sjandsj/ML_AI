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
  },
});

const Games = props => (
  <View style={[styles.playContainer, props.style]}>
    <Table
      bets={props.bets}
      comboBets={props.comboBets}
      handleLoadMoreComboBets={() => props.handleLoadMoreComboBets()}
      isPortrait={props.isPortrait}
      _handleRefresh={props._handleRefresh}
      handleLoadMore={() => props.handleLoadMore()}
      selectedTab={props.selectedTab}
      betCashout={(data, betType) => props.betCashout(data, betType)}
    />
  </View>
);

Games.propTypes = {
  style: PropTypes.objectOf(PropTypes.any),
  bets: PropTypes.array,
  isPortrait: PropTypes.bool,
  _handleRefresh: PropTypes.func,
  handleLoadMore: PropTypes.func,
  comboBets: PropTypes.array,
  selectedTab: PropTypes.string,
  handleLoadMoreComboBets: PropTypes.func,
};

Games.defaultProps = {
  style: {},
  bets: [],
  isPortrait: true,
  _handleRefresh: () => {},
  handleLoadMore: () => {},
  comboBets: [],
  selectedTab: '',
  handleLoadMoreComboBets: () => {},
};

export default Games;

