import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Text,
} from 'react-native';
import BackgrounMessage from '../../../components/BackgroundMessage';
import PendingBetView from './PendingBetView';
import { UIColors, spacing, fontName, fontSizes, itemSizes } from '../../../utils/variables';
import { selectedTab } from '../../../utils/enum';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';
import PendingComboBetView from './PendingComboBetView';
import { toFixTwoDigitAfterDecimal } from '../../../utils/utils_functions';

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  seperator: {
    height: 1,
  },
  containerAfterRefresh: {
    flex: 1,
  },
  comboHeaderTitle: {
    fontSize: fontSizes.extraSmall,
    color: UIColors.defaultWhite,
    fontFamily: fontName.sourceSansProRegular,
  },
  comboHeaderValue: {
    fontSize: fontSizes.extraSmall,
    color: UIColors.defaultWhite,
    fontFamily: fontName.sourceSansProRegular,
  },
  cashoutValue: {

  },
  cashoutButton: {
    backgroundColor: UIColors.newAppHeaderColorGreen,
    padding: 5,
    marginVertical: spacing.medium,
    // marginBottom: spacing.small,
    width: itemSizes.largeWidth,
    alignSelf: 'center',
  },
  cashoutTitle: {
    color: UIColors.focused,
    fontFamily: fontName.sourceSansProSemiBold,
    fontSize: fontSizes.small,
    textAlign: 'center',
  },
  disableCashoutText: {
    color: UIColors.primaryText,
    fontFamily: fontName.sourceSansProSemiBold,
    fontSize: fontSizes.small,
    textAlign: 'center',
    backgroundColor: UIColors.primary,
    width: itemSizes.largeWidth,
    alignSelf: 'center',
    padding: 5,
    marginVertical: spacing.medium,
    // marginBottom: spacing.small,
  },
});

const Table = props => (
  <View style={styles.tableContainer}>
    { props.selectedTab === selectedTab.SINGLE ?
      <View style={styles.container}>
        {props.bets.length !== 0 ? <FlatList
          data={props.bets}
          style={{ margin: spacing.small }}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => props.handleLoadMore()}
          onEndThreshold={0.1}
          ItemSeparatorComponent={() => <View style={styles.seperator} />}
          renderItem={
            (item, index) => (<PendingBetView
              index={index}
              item={item}
              isPortrait={props.isPortrait}
            />)
          }
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={props._handleRefresh}
            />
          }
        /> :
        <View style={styles.containerAfterRefresh}>
          <BackgrounMessage title={commonLocalizeStrings.noBetsToDisplay} />
        </View>
        }
      </View>
      :
      <View style={styles.container}>
        {props.comboBets.length !== 0 ? <FlatList
          data={props.comboBets}
          style={{ margin: spacing.small }}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => props.handleLoadMoreComboBets()}
          onEndThreshold={0.1}
          ItemSeparatorComponent={() => <View style={[styles.seperator, { height: spacing.small }]} />}
          renderItem={
            (item, index) => (
              <View style={{ backgroundColor: UIColors.newAppGrayContentColor, borderRadius: spacing.small, paddingTop: spacing.extraSmall }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <View>
                    <Text style={styles.comboHeaderTitle}>Combo Bet Number</Text>
                    <Text style={styles.comboHeaderValue}>{item.item.id}</Text>
                  </View>
                  <View>
                    <Text style={styles.comboHeaderTitle}>Amt</Text>
                    <Text style={styles.comboHeaderValue}>{item.item.stake}</Text>
                  </View>
                  <View>
                    <Text style={styles.comboHeaderTitle}>Odds</Text>
                    <Text style={styles.comboHeaderValue}>{item.item.odds}</Text>
                  </View>
                  <View>
                    <Text style={styles.comboHeaderTitle}>Cashed Amount</Text>
                    <Text style={styles.comboHeaderValue}>
                      {toFixTwoDigitAfterDecimal(item.item.cashout_amount)}
                    </Text>
                  </View>
                </View>
                <FlatList
                  data={item.item.bets}
                  style={{ margin: spacing.small }}
                  keyExtractor={item1 => item1.id.toString()}
                  ItemSeparatorComponent={() => <View style={styles.seperator} />}
                  renderItem={
                    (itemPack, indexPack) => (
                      <View>
                        <PendingComboBetView
                          index={indexPack}
                          item={itemPack.item}
                          isPortrait={props.isPortrait}
                        />
                      </View>)}
                />
              </View>)}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={props._handleRefresh}
            />
          }
        /> :
        <View style={styles.containerAfterRefresh}>
          <BackgrounMessage title={commonLocalizeStrings.noBetsToDisplay} />
        </View>}
      </View>}
  </View>
);

Table.propTypes = {
  bets: PropTypes.array,
  isPortrait: PropTypes.bool,
  _handleRefresh: PropTypes.func,
  handleLoadMore: PropTypes.func,
  selectedTab: PropTypes.string,
  handleLoadMoreComboBets: PropTypes.func,
  comboBets: PropTypes.array,
};

Table.defaultProps = {
  bets: [],
  isPortrait: true,
  _handleRefresh: () => { },
  handleLoadMore: () => {},
  selectedTab: '',
  handleLoadMoreComboBets: () => {},
  comboBets: [],
};

export default Table;
