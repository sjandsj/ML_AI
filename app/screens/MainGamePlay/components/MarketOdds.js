import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import _ from 'lodash';
import { UIColors, itemSizes, spacing, fontSizes, fontName } from '../../../utils/variables';
import { formateData } from '../../../utils/utils';
import BackgrounMessage from '../../../components/BackgroundMessage';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  SectionHeader: {
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    fontSize: fontSizes.small,
    fontFamily: fontName.sourceSansProRegular,
    padding: spacing.small,
    color: UIColors.defaultWhite,
  },
  SectionListItemS: {
    fontSize: fontSizes.extraSmall,
    fontFamily: fontName.sourceSansProRegular,
    paddingVertical: spacing.extraExtraSmall,
    color: UIColors.focused,
    backgroundColor: UIColors.newAppGrayContentColor,
    textAlign: 'center',
  },
  oddsBox: {
    fontSize: fontSizes.extraSmall,
    fontFamily: fontName.sourceSansProRegular,
    padding: spacing.small,
    backgroundColor: UIColors.defaultWhite,
    width: itemSizes.largeWidth,
    textAlign: 'center',
  },
  oddsBoxSelected: {
    fontSize: fontSizes.extraSmall,
    fontFamily: fontName.sourceSansProRegular,
    padding: spacing.small,
    backgroundColor: UIColors.focused,
    width: itemSizes.largeWidth,
    textAlign: 'center',
    color: UIColors.newAppButtonGreenBackgroundColor,
  },
  specifier: {
    fontSize: fontSizes.small,
    fontFamily: fontName.sourceSansProSemiBold,
    color: UIColors.defaultWhite,
    width: itemSizes.largeWidth,
    textAlign: 'center',
  },
  specifierContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seperator: {
    flex: 1,
    height: 1,
    backgroundColor: UIColors.primary,
  },
  oddsList: {
    flex: 1,
    backgroundColor: UIColors.newAppGrayContentColor,
  },
  oddsContent: {
    flex: 1,
    padding: spacing.small,
    paddingBottom: spacing.large,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellView: {
    flex: 1,
  },
});

const MarketOdds = props => (
  <View style={styles.listContainer}>
    { _.every(props.marketDataForMatch, { status: '0' }) ?
      <BackgrounMessage title={commonLocalizeStrings.noAvailableOdds} />
    : <FlatList
      keyExtractor={(item, index) => `${index}markets`}
      data={props.marketDataForMatch}
      extraData={props}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={props.refreshMarkets}
        />
      }
      renderItem={item => (
        <View>
          { (item.item.status === 'open' || item.item.status === '1') &&
          <View>
            <Text style={styles.SectionHeader}> {item.item.name} </Text>
            <FlatList
              extraData={props}
              scrollEnabled={false}
              keyExtractor={(_item, index) => `${index}specifier`}
              ItemSeparatorComponent={() => <View style={styles.seperator} />}
              data={item.item.specifiers}
              renderItem={spcfrData => (
                <View style={styles.specifierContainer}>
                  {spcfrData.item.specifierName !== '49' &&
                    <Text style={styles.specifier}>
                      {spcfrData.item.specifierName}
                    </Text>}
                  <FlatList
                    extraData={props}
                    scrollEnabled={false}
                    keyExtractor={(_item, index) => `${index}odds`}
                    style={styles.oddsList}
                    numColumns={3}
                    key={props.isPortrait ? 'v' : 'h'}
                    data={formateData(spcfrData.item.outcomes, 3)}
                    ItemSeparatorComponent={() => <View style={styles.seperator} />}
                    // data={spcfrData.item.outcomes}
                    renderItem={(dataValue) => {
                      if (_.isEmpty(dataValue.item)) {
                        return <View style={styles.cellView} />;
                      }
                      const isContains = !_
                        .chain(props.betSlips)
                        .find(dataValue.item)
                        .isEmpty()
                        .value();
                      return (
                        <View style={styles.oddsContent}>
                          <Text style={styles.SectionListItemS}>
                            {props.showOddsSpecifierName(item.item.marketUID, dataValue.item)}
                          </Text>
                          <TouchableOpacity
                            onPress={() => props.onPressOdd(item.item.marketUID, dataValue.item)}
                          >
                            <Text
                              style={isContains
                              ? styles.oddsBoxSelected
                              : styles.oddsBox}
                            >
                              {dataValue.item.odds}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                  />
                </View>
              )}
            />
          </View>}
        </View>
      )}
    /> 
    }
  </View>
);

MarketOdds.propTypes = {
  onPressOdd: PropTypes.func,
  marketDataForMatch: PropTypes.array,
  refreshMarkets: PropTypes.func,
  betSlips: PropTypes.array,
  isPortrait: PropTypes.bool,
  showOddsSpecifierName: PropTypes.func,
};

MarketOdds.defaultProps = {
  onPressOdd: () => { },
  marketDataForMatch: [],
  refreshMarkets: () => { },
  betSlips: [],
  isPortrait: true,
  showOddsSpecifierName: () => {},
};

export default MarketOdds;
