import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import TouchableHold from '../../../components/TouchableHold';
import BackgrounMessage from '../../../components/BackgroundMessage';
import PendingBetView from './PendingBetView';
import { UIColors, spacing, fontName, fontSizes, itemSizes } from '../../../utils/variables';
import { selectedTab } from '../../../utils/enum';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';
import PendingComboBetView from './PendingComboBetView';
import { toFixTwoDigitAfterDecimalWithoutRounding } from '../../../utils/utils_functions';
import DateManager from '../../../utils/dateManager';
import { showOptionAlert } from '../../../utils/showAlert';

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
    backgroundColor: UIColors.primaryText,
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
    backgroundColor: UIColors.primaryText,
    marginVertical: spacing.medium,
    width: itemSizes.largeWidth,
    alignSelf: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 0.5,
  },
  cashoutTitle: {
    color: UIColors.newAppButtonGreenBackgroundColor,
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
    {props.selectedTab === selectedTab.SINGLE ?
      <View style={styles.container}>
        {props.bets.length !== 0 ? <FlatList
          data={props.bets}
          listKey={(item, index) => 'B' + index.toString()}
          style={{ margin: spacing.small }}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => props.handleLoadMore()}
          onEndThreshold={0.1}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.seperator} />}
          renderItem={

            (item, index) => {
              const date = new Date(item.item.date);
              const matchDate = DateManager.formatReverseDateWithDash(date);
              const hour = date.getHours();
              const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

                return (<View style={{ margin: spacing.medium, backgroundColor: UIColors.newAppButtonGreenBackgroundColor, borderRadius: spacing.small, paddingTop: spacing.extraSmall }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.comboHeaderTitle}>Bet No.</Text>
                    <Text style={styles.comboHeaderValue}>{item.item.id}</Text>
                  </View>
                  <View style={{ flex: 1.5, alignItems: 'center' }}>
                    <Text style={styles.comboHeaderTitle}>{matchDate}</Text>
                    <Text style={styles.comboHeaderValue}>{`${hour}:${minutes}`}</Text>
                  </View>
                  <View style={{ flex: 0.6, alignItems: 'center' }}>
                    <Text style={styles.comboHeaderTitle}>Amt</Text>
                    <Text style={styles.comboHeaderValue}>{item.item.stake} TND</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.comboHeaderTitle}>Odds</Text>
                    <Text style={styles.comboHeaderValue} numberOfLines={2}>{item.item.odds}</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.comboHeaderTitle}>To return</Text>
                    <Text style={styles.comboHeaderValue} numberOfLines={1}>
                      {item.item.to_return} TND
                    </Text>
                  </View>
                </View>
                <PendingBetView
                  index={index}
                  item={item}
                  isPortrait={props.isPortrait}
                  betCashout={(data, betType) => props.betCashout(data, betType)}
                />
              </View>)
            }
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
          extraData={props}
          style={{ margin: spacing.small }}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => props.handleLoadMoreComboBets()}
          onEndThreshold={0.1}
          ItemSeparatorComponent={() => <View style={[styles.seperator, { height: spacing.medium }]} />}
          renderItem={
            (item, index) => {
              const date = new Date(item.item.date);
              const matchDate = DateManager.formatReverseDateWithDash(date);
              const hour = date.getHours();
              const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
              return (
                <View style={{ margin: spacing.medium, backgroundColor: UIColors.newAppButtonGreenBackgroundColor, borderRadius: spacing.small, paddingTop: spacing.extraSmall }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                      <Text style={styles.comboHeaderTitle}>Bet No.</Text>
                      <Text style={styles.comboHeaderValue}>{item.item.id}</Text>
                    </View>
                    <View style={{ flex: 1.5, alignItems: 'center' }}>
                      <Text style={styles.comboHeaderTitle}>{matchDate}</Text>
                      <Text style={styles.comboHeaderValue}>{`${hour}:${minutes}`}</Text>
                    </View>
                    <View style={{ flex: 0.6, alignItems: 'center' }}>
                      <Text style={styles.comboHeaderTitle}>Amt</Text>
                      <Text style={styles.comboHeaderValue}>{item.item.stake} TND</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                      <Text style={styles.comboHeaderTitle}>Odds</Text>
                      <Text style={styles.comboHeaderValue} numberOfLines={2}>{item.item.odds}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                      <Text style={styles.comboHeaderTitle}>To return</Text>
                      <Text style={styles.comboHeaderValue} numberOfLines={1}>
                      {item.item.to_return} TND
                      </Text>
                    </View>
                  </View>
                  <FlatList
                    data={item.item.bets}
                    style={{ margin: spacing.small }}
                    listKey={(item, index) => 'A' + index.toString()}
                    keyExtractor={item1 => item1.id.toString()}
                    ItemSeparatorComponent={() => <View style={styles.seperator} />}
                    renderItem={
                      (itemPack, indexPack) => {
                        return (
                          <View>
                            <PendingComboBetView
                              index={indexPack}
                              item={itemPack.item}
                              isPortrait={props.isPortrait}
                            />
                          </View>)
                      }}
                  />
                  {item.item.status === 'lost' ?
                    <TouchableHold
                      disabled
                      style={styles.cashoutButton}
                    >
                      <Text style={[styles.cashoutTitle, { color: UIColors.appRedColor }]}>LOST</Text>

                    </TouchableHold>
                    :
                    null
                  }
                  {item.item.is_cashoutable ?
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                      <TouchableHold
                        style={styles.cashoutButton}
                        onTouch={() => {
                          showOptionAlert(
                            commonLocalizeStrings.alert,
                            commonLocalizeStrings.cashoutContinue,
                            commonLocalizeStrings.cashout,
                            commonLocalizeStrings.cancel,
                            text => text === 0 && props.betCashout({
                              combo_id: item.item.id, cashoutable: item.item.cashoutable,
                            }, 'combo'),
                          );
                        }}
                      >
                        <Text style={styles.cashoutTitle}>Cashout</Text>
                        <Text style={styles.cashoutTitle}>{`\t${toFixTwoDigitAfterDecimalWithoutRounding(item.item.cashoutable.amount)}`}</Text>
                      </TouchableHold>
                    </View>
                    :
                    <View>
                      {/* <Text style={styles.disableCashoutText}>Cashout</Text> */}
                    </View>}

                </View>)
            }}
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
  selectedTab: PropTypes.bool,
  handleLoadMoreComboBets: PropTypes.func,
  comboBets: PropTypes.array,
};

Table.defaultProps = {
  bets: [],
  isPortrait: true,
  _handleRefresh: () => { },
  handleLoadMore: () => { },
  selectedTab: false,
  handleLoadMoreComboBets: () => { },
  comboBets: [],
};

export default Table;
