import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, RefreshControl, Image } from 'react-native';
import _ from 'lodash';
import { UIColors, itemSizes, spacing, fontSizes, fontName, fontWeights } from '../../../utils/variables';
import { formateData } from '../../../utils/utils';
import BackgrounMessage from '../../../components/BackgroundMessage';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';
import { images } from '../../../assets/images';

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  SectionHeader: {
    fontSize: fontSizes.tiny,
    color: UIColors.secondaryText,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
  },
  SectionListItemS: {
    fontSize: fontSizes.tiny,
    fontFamily: fontName.sourceSansProRegular,
    paddingVertical: spacing.extraExtraSmall,
    color: UIColors.newAppButtonGreenBackgroundColor,
    textAlign: 'center',
  },
  // oddsBox: {
  //   flex: 1,
  //   width: '100%',
  //   fontSize: fontSizes.extraSmall,
  //   fontFamily: fontName.sourceSansProRegular,
  //   padding: spacing.small,
  //   backgroundColor: UIColors.defaultWhite,
  //   // width: itemSizes.largeWidth,
  //   textAlign: 'center',
  // },
  // oddsBoxSelected: {
  //   flex: 1,
  //   width: '100%',
  //   fontSize: fontSizes.extraSmall,
  //   fontFamily: fontName.sourceSansProRegular,
  //   padding: spacing.small,
  //   backgroundColor: UIColors.focused,
  //   // width: itemSizes.largeWidth,
  //   textAlign: 'center',
  //   color: UIColors.newAppButtonGreenBackgroundColor,
  // },
  oddsBox: {
    flex: 1,
    fontSize: fontSizes.extraExtraSmall,
    fontWeight: fontWeights.bold,
    fontFamily: fontName.sourceSansProRegular,
    padding: spacing.small,
    backgroundColor: UIColors.lightGreyBackground,
    textAlign: 'center',
    color: UIColors.secondaryText,
  },
  oddsBoxSelected: {
    flex: 1,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.extraExtraSmall,
    fontFamily: fontName.sourceSansProRegular,
    padding: spacing.small,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    textAlign: 'center',
    color: UIColors.primaryText,
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
    borderBottomWidth: spacing.borderDouble,
    borderBottomColor: UIColors.blueBorder,
  },
  seperator: {
    flex: 1,
    height: 1,
    backgroundColor: UIColors.primary,
  },
  oddsList: {
    flex: 1,
  },
  oddsContent: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  oddButtonStyle: {
    width: '100%',
    height: itemSizes.defaultButtonHeight,
    flex: 1,
    borderWidth: spacing.border,
    borderColor: UIColors.greyBackground,
  },
  cellView: {
    // width: '100%',
    // backgroundColor: 'green',
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
          { (item.item.status === 'open'|| item.item.status === 'suspended, open' || item.item.status === 'open, suspended' || item.item.status === '1') &&
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
                    data={formateData(spcfrData.item.outcomes, 2)}
                    ItemSeparatorComponent={() => <View style={styles.seperator} />}
                    // data={spcfrData.item.outcomes}
                    renderItem={(dataValue) => {
                      if (_.isEmpty(dataValue.item)) {
                        return <View style={styles.cellView} />;
                      }
                      const isMarketRepeated = !_
                        .chain(props.betSlips)
                        .find({ matchID: props.matchID })
                        .isEmpty()
                        .value();
                      const isContains = !_
                        .chain(props.betSlips)
                        .find({uid: dataValue.item.uid, matchID: props.matchID, marketUID: dataValue.item.marketID })
                        .isEmpty()
                        .value();
                      return (
                        <View style={styles.oddsContent}>
                          <Text style={styles.SectionListItemS}>
                            {props.showOddsSpecifierName(item.item.marketUID, dataValue.item)}
                          </Text>
                          { (isMarketRepeated && !isContains) ?
                            <TouchableOpacity
                              disabled
                              style={[styles.oddButtonStyle, { backgroundColor: UIColors.lightGreyBackground, opacity: 0.4 }]}
                              onPress={() => props.onPressOdd(item.item.marketUID, dataValue.item)}
                            >
                              <Image source={images.lockIcon} style={{ padding: spacing.border, alignSelf: 'flex-end', height: itemSizes.item10, width: itemSizes.item10 }} />
                              <Text
                                style={[styles.oddsBox, { padding: spacing.border }]}
                              >
                                {dataValue.item.odds}
                              </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                              // disabled={}
                              style={styles.oddButtonStyle}
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
                          }
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
