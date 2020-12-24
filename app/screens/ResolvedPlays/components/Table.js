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
import ResolvedBetsView from './ResolvedBetsView';
import { UIColors, itemSizes, spacing, fontSizes, fontName, fontWeights } from '../../../utils/variables';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';
import { selectedTab } from '../../../utils/enum';
import ResolvedComboBetsView from './ResolvedComboBetsView';
import TouchableHold from '../../../components/TouchableHold';
import DateManager from '../../../utils/dateManager';
import { toFixTwoDigitAfterDecimalWithoutRounding } from '../../../utils/utils_functions';

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    // backgroundColor: UIColors.primaryText,
  },
  subContainerMargin: {
    margin: spacing.small,
  },
  seperator: {
    flex: 1,
    height: 1,
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
});

const keyExtractor = item => item.id.toString();

const Table = props => (
  <View style={styles.tableContainer}>
    {
      props.selectedTab === selectedTab.SINGLE ?
        <View style={styles.subContainer}>
          {props.bets && props.bets.length !== 0 ? <FlatList
            data={props.bets}
            style={styles.subContainerMargin}
            onEndReached={() => props.handleLoadMore()}
            onEndThreshold={0.1}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            listKey={(item, index) => 'B' + index.toString()}
            renderItem={
              (item, index) => {
                const date = new Date(item.item.date);
                const matchDate = DateManager.formatReverseDateWithDash(date);
                const hour = date.getHours();
                const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
                return (
                  <View style={{ backgroundColor: UIColors.newAppButtonGreenBackgroundColor, borderRadius: spacing.small, paddingTop: spacing.extraSmall, marginTop: 10, }}>
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
                        <Text style={styles.comboHeaderValue}>{item.item.odds}</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.comboHeaderTitle}>To return</Text>
                        <Text numberOfLines={1} style={styles.comboHeaderValue}>
                        {item.item.to_return} TND
                        </Text>
                      </View>
                    </View>
                    <ResolvedBetsView
                      index={index}
                      item={item}
                      isPortrait={props.isPortrait}
                    />
                    <View style={styles.seperator} />
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
            <BackgrounMessage title={commonLocalizeStrings.noBetsToDisplay} />
          }
        </View>
        :
        <View style={styles.subContainer}>
          {props.comboBets.length !== 0 ? <FlatList
            data={props.comboBets}
            style={styles.subContainerMargin}
            onEndReached={() => props.handleLoadMoreComboBet()}
            onEndThreshold={0.1}
            ItemSeparatorComponent={() => <View style={[styles.seperator, { height: spacing.small }]} />}
            keyExtractor={keyExtractor}
            renderItem={
              (item, index) => {
                const date = new Date(item.item.date);
                const matchDate = DateManager.formatReverseDateWithDash(date);
                const hour = date.getHours();
                const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
                return (
                  <View style={{ backgroundColor: UIColors.newAppButtonGreenBackgroundColor, borderRadius: spacing.small, paddingTop: spacing.extraSmall }}>
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
                        <Text style={styles.comboHeaderValue}>{item.item.odds}</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.comboHeaderTitle}>To return</Text>
                        <Text numberOfLines={1} style={styles.comboHeaderValue}>
                          {item.item.to_return} TND
                        </Text>
                      </View>
                    </View>
                    <FlatList
                      data={item.item.bets}
                      listKey={(item, index) => 'A' + index.toString()}
                      style={styles.subContainerMargin}
                      keyExtractor={keyExtractor}
                      renderItem={
                        (itemPack, indexPack) => (
                          <View>
                            <ResolvedComboBetsView
                              index={indexPack}
                              item={itemPack.item}
                              isPortrait={props.isPortrait}
                            />
                            <View style={styles.seperator} />
                          </View>
                        )}
                    />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                      <TouchableHold
                        style={styles.cashoutButton}
                        disabled={true}
                      >
                        <Text style={[item.item.status === 'lost' ?
                          { color: UIColors.appRedColor, fontWeight: fontWeights.bold }
                          : { color: UIColors.appGreenColor },
                        { fontWeight: fontWeights.bold, fontSize: fontSizes.small }]}
                        >
                          {(item.item.status).toUpperCase()}
                        </Text>
                      </TouchableHold>
                    </View>
                    <View style={styles.seperator} />
                  </View>
                )
              }
            }
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={props._handleRefresh}
              />
            }
          /> :
            <BackgrounMessage title={commonLocalizeStrings.noBetsToDisplay} />
          }
        </View>
    }
  </View>
);

Table.propTypes = {
  bets: PropTypes.array,
  handleLoadMore: PropTypes.func,
  isPortrait: PropTypes.bool,
  _handleRefresh: PropTypes.func,
};

Table.defaultProps = {
  bets: [],
  handleLoadMore: () => { },
  isPortrait: true,
  _handleRefresh: () => { },
};

export default Table;
