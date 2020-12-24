import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { UIColors, fontSizes, spacing, fontName, itemSizes, fontWeights } from '../../../utils/variables';
import { toFixTwoDigitAfterDecimal } from '../../../utils/utils_functions';
import { resolvedBetsLocalizeString } from '../../../localization/resolvedBetsLocalizeString';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';
import { images } from '../../../assets/images';
import DateManager from '../../../utils/dateManager';
import TouchableHold from '../../../components/TouchableHold';

const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColors.primaryText,
    margin: spacing.medium,
    borderRadius: 5,
    minHeight: 120,
    paddingHorizontal:10,
    paddingRight: 15
  },
  upperHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.semiMedium,
    paddingTop: spacing.semiMedium,
    paddingBottom: spacing.small,
    alignItems: 'flex-start',
  },
  subUpperHead: {
    flex: 1,
  },
  dateTitle: {
    fontSize: fontSizes.extraSmall - 2,
    color: UIColors.defaultBlack,
    fontFamily: fontName.sourceSansProRegular,
  },
  lowerPart: {
    alignItems: 'center',
    paddingBottom: spacing.large,
  },
  match: {
    fontFamily: fontName.sourceSansProSemiBold,
    color: UIColors.newAppButtonGreenBackgroundColor,
    fontSize: fontSizes.medium - 2,
  },
  stakeView: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: spacing.semiMedium,
    justifyContent: 'space-around',
  },
  stakeAmount: {
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.extraSmall,
    color: UIColors.defaultBlack,
    textAlign: 'center',
  },
  placeholderText: {
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
    textAlign: 'center',
  },
  stakeContainer: {
    flex: 1,
  },
  toWinContainer: {
    flex: 1,
  },
  dateAndOddsView: {
    flexDirection: 'row',
  },
});

const statusIcon = status => {
  switch (status) {
    case 'PENDING':
      return
    case 'WON':
      return images.greenTick
    case 'LOST':
      return images.redCrossIcon
    default:
      break;
  }
}

const getStatus = match => {
  if (match.match_status === "ended" || match.match_status === null) {
    return `Finished`
  } else if (match.match_status === "resolved") {
    return `Resolved`
  } else if (match.match_status === "in_progress") {
    return `${match.running_time}'`
  } else {
    return ''
  }
}

const getScore = match => {
  if (match.match_status === "ended" || match.match_status === null || match.match_status === "resolved") {
    return `${match.final_score}`
  } else if (match.match_status === "in_progress") {
    return `${match.final_score}'`
  } else {
    return ''
  }
}

const ResolvedBetsView = (props) => {
  const { isPortrait } = props;
  const { item } = props.item;
  const odds = Number(item.odds);
  const WON = 'won';
  const LOST = 'lost';
  const date = new Date(item.date);
  const matchDate = DateManager.formatDateWithDash(date);
  const hour = date.getHours();
  const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  const scheduleAt = new Date(item.schedule_at);
  const scheduleDate = DateManager.formatDateWithDash(scheduleAt);
  const scheduleHour = scheduleAt.getHours();
  const scheduleMinutes = (scheduleAt.getMinutes() < 10 ? '0' : '') + scheduleAt.getMinutes();
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 50, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={{ uri: item.sport_icon_url }} style={{ width: 20, height: 20, marginRight: 5 }} />
        <Text numberOfLines={1} style={[styles.match, { textAlign: 'center' }]}>{item.match_title}</Text>
      </View>

      <View style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', justifyContent: 'space-between', }}>
        <View style={{ alignItems: 'center', }}>
          <Text style={styles.dateTitle}>{`${scheduleDate}`}</Text>
          <Text style={styles.dateTitle}>{`${scheduleHour}:${scheduleMinutes}`}</Text>
        </View>

        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Text numberOfLines={3}
            ellipsizeMode='tail' style={[styles.dateTitle, { textAlign: 'center', width: 150 }]}>{`${item.market_name} `}</Text>
          <Text numberOfLines={2} style={[styles.dateTitle, { width: 50 }]}>{`(${item.outcome_name})`}</Text>
        </View>

        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Text style={styles.dateTitle}>{`|${odds}|`}</Text>
        </View>
      </View>

      <View style={[styles.dateAndOddsView, { paddingTop: 10, paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center' }]}>
        <Text style={(item.match_status == "in_progress") ? { fontSize: fontSizes.extraSmall, color: UIColors.greenFontColor, fontWeight: fontWeights.bold } : styles.dateTitle}>
          {`${getStatus(item)}`}
        </Text>
        {(item.match_status === "not_started") ?
          null
          :
          <Text style={styles.dateTitle}>
            {`(${item.full_and_half_time_score})`}
          </Text>}
        <Text style={styles.dateTitle}>
          {`${getScore(item)}`}
        </Text>
      </View>

      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableHold
          style={styles.cashoutButton}
          disabled={true}
        >
          <Text style={[item.status === 'lost' ?
            { color: UIColors.appRedColor, fontWeight: fontWeights.bold }
            : { color: UIColors.appGreenColor },
          { fontWeight: fontWeights.bold, fontSize: fontSizes.small }]}
          >
            {(item.status).toUpperCase()}
          </Text>
        </TouchableHold>
      </View>
    </View>
  );
};

ResolvedBetsView.propTypes = {
  item: PropTypes.object,
  isPortrait: PropTypes.bool,
};

ResolvedBetsView.defaultProps = {
  item: {},
  isPortrait: true,
};

export default ResolvedBetsView;
