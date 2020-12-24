import React from 'react';
import _ from 'lodash';
import { Text, View, StyleSheet, Image, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native';
import { UIColors, fontName, fontSizes, spacing, itemSizes, fontWeights } from '../../../utils/variables';
import { images } from '../../../assets/images';
import PropTypes from 'prop-types';
import CustomText from '../../../components/CustomText';
import DateManager from '../../../utils/dateManager';
import { marketDataUpdated } from '../../../parser/marketParser';
import { formateData } from '../../../utils/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: spacing.borderDouble,
    borderBottomColor: UIColors.blueBorder,
    // width: '100%',
    marginBottom: spacing.small,

  },
  matchDetailContainer: {
    backgroundColor: UIColors.greyBackground,
    // height: itemSizes.defaultButtonHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateTimeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: spacing.small,
  },
  dateAndTimeTextStyle: {
    color: UIColors.success,
    fontSize: fontSizes.mini,
  },
  teamNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    justifyContent: 'center',
  },
  teamNameStyle: {
    textAlign: 'center',
    //  margin: spacing.small,
    color: UIColors.newAppButtonGreenBackgroundColor,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.extraExtraSmall,
  },
  viewForBlueBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.small,
    height: itemSizes.iconSmall,
    width: itemSizes.iconLarge,
    backgroundColor: UIColors.newAppFontBlueColor,
    borderRadius: spacing.extraExtraSmall,
  },
  blueBoxTextStyle: {
    fontSize: fontSizes.tiny,
    fontWeight: fontWeights.bold,
    color: UIColors.primaryText,
  },
  betType: {
    fontSize: fontSizes.tiny,
    color: UIColors.secondaryText,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
  },
  betTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: itemSizes.defaultButtonHeight,
  },
  oddButtonStyle: {
    flex: 1,
    borderWidth: spacing.border,
    borderColor: UIColors.greyBackground,
  },
  oddsBox: {
    fontSize: fontSizes.extraExtraSmall,
    fontWeight: fontWeights.bold,
    fontFamily: fontName.sourceSansProRegular,
    padding: spacing.small,
    backgroundColor: UIColors.lightGreyBackground,
    textAlign: 'center',
    color: UIColors.secondaryText,
  },
  oddsBoxSelected: {
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.extraExtraSmall,
    fontFamily: fontName.sourceSansProRegular,
    padding: spacing.small,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    textAlign: 'center',
    color: UIColors.primaryText,
  },
});
const checkData = (betSlips, dataValue) => {
  const isContains = !_
    .chain(betSlips)
    .find(dataValue)
    .isEmpty()
    .value();
  return isContains;
};


const MatchOdds = (props) => {
  const team = `${props.item.name}`;
  const teamNames = team.split(' vs ');
  const date = new Date(props.item.schedule_at);
  const matchDate = DateManager.formatDateWithDash(date);
  const hour = date.getHours();
  const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  let outcomes;
  let isMarketAvailable;
  let updatedMarket;

  if (props.item.markets && !_.isEmpty(props.item.markets)) {
    updatedMarket = marketDataUpdated(props.item.markets);
  }
  if (props.item.market === null || _.isEmpty(props.item.market)) {
    isMarketAvailable = false;
  } else {
    isMarketAvailable = true;
    outcomes = props.item.market.outcomes;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={props.matchNameContainerPressed}
        style={styles.matchDetailContainer}
      >
        <View style={styles.dateTimeContainer}>
          {/* <CustomText title="LIVE" textStyle={{ color: UIColors.newAppButtonGreenBackgroundColor, fontSize: fontSizes.mini }} /> */}
          <CustomText title={matchDate} textStyle={styles.dateAndTimeTextStyle} />
          <CustomText title={`${hour}:${minutes}`} textStyle={styles.dateAndTimeTextStyle} />
        </View>
        <View style={styles.teamNameContainer}>
          <View style={{ justifyContent: 'center', marginBottom: spacing.extraExtraSmall, marginTop: spacing.extraExtraSmall, flex: 4 }}>
            <Text
              style={styles.teamNameStyle}
              numberOfLines={3}
            >
              {(teamNames && teamNames.length === 0) ? '' : teamNames[0]}
            </Text>
          </View>
          <View style={{ justifyContent: 'center', marginBottom: spacing.extraExtraSmall, marginTop: spacing.extraExtraSmall, flex: 1 }}>
            <Text
              style={[styles.teamNameStyle, { margin: spacing.extraExtraSmall, color: UIColors.secondaryText }]}
            >
              Vs
            </Text>
          </View>
          <View style={{ justifyContent: 'center', marginBottom: spacing.extraExtraSmall, marginTop: spacing.extraExtraSmall, flex: 4 }}>
            <Text
              style={styles.teamNameStyle}
              numberOfLines={3}
            >
              {(teamNames && teamNames.length === 0) ? '' : teamNames[1]}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: spacing.small }}>
          <View style={styles.viewForBlueBox}>
            <CustomText title={updatedMarket ? props.item.market_counts : 0} textStyle={styles.blueBoxTextStyle} />
          </View>
          <View>
            <Image source={images.rightArrowBlack} style={{ height: itemSizes.iconSmall, width: itemSizes.iconSmall }} />
          </View>
        </View>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {isMarketAvailable &&
        <CustomText title={props.selectedFilter && props.selectedFilter} textStyle={styles.betType} />
        }
      </View>
      <View>
        {isMarketAvailable === true &&
        <FlatList
          extraData={props}
          scrollEnabled={false}
          keyExtractor={(_item, index) => `${index}odds`}
          // style={styles.oddsList}
          numColumns={3}
          key={props.isPortrait ? 'v' : 'h'}
          listKey={(item, index) => 'C' + index.toString()}
          data={formateData(Object.values(outcomes), 2)}
          ItemSeparatorComponent={() => <View style={styles.seperator} />}
          // data={spcfrData.item.outcomes}
          renderItem={(dataValue) => {
            if (_.isEmpty(dataValue.item)) {
              return <View style={styles.cellView} />;
            }
            const isMarketRepeated = !_
            .chain(props.betSlips)
            .find({ matchID: props.item.id })
            .isEmpty()
            .value();
            const isContains = !_
              .chain(props.betSlips)
              .find({ uid: dataValue.item.uid, matchID: props.item.id, marketUID: props.item.market.uid})
              .isEmpty()
              .value();
            return (
              <View style={{flex: 1}}>
                { (isMarketRepeated && !isContains) ?
                  <TouchableOpacity
                    disabled
                    style={[styles.oddButtonStyle, { backgroundColor: UIColors.lightGreyBackground, opacity: 0.4 }]}
                    // onPress={() => props.onPressOdd(item.item.marketUID, dataValue.item)}
                  >
                    <Image source={images.lockIcon} style={{ padding: spacing.border, alignSelf: 'flex-end', height: itemSizes.item10, width: itemSizes.item10 }} />
                    <Text
                      style={[styles.oddsBox, { padding: spacing.border}]}
                    >
                      {isMarketAvailable ? `${dataValue.item.name}    ${dataValue.item.odds}`: 'N.A.' }
                    </Text>
                  </TouchableOpacity>
                :
                  <TouchableOpacity
                    style={styles.oddButtonStyle}
                    onPress={() => (isMarketAvailable ? props.onPressOdd(props.item, dataValue.item) : null)}
                  >
                    <Text
                      style={isContains
                      // style={checkData(props.betSlips, dataValue.item)
                        ? styles.oddsBoxSelected
                        : styles.oddsBox}
                    >
                      {isMarketAvailable ? `${dataValue.item.name}    ${dataValue.item.odds}`: 'N.A.' }
                    </Text>
                  </TouchableOpacity>
                }
                
              </View>
              
            );
          }}
        />}
      </View>
    </View>
  );
};

export { MatchOdds };
