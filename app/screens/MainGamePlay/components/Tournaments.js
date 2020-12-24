import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import _ from 'lodash';
import { UIColors, spacing, fontSizes, fontName } from '../../../utils/variables';
import { formateData } from '../../../utils/utils';
import BackgrounMessage from '../../../components/BackgroundMessage';
import { mainGAmePlayLocalizeString } from '../../../localization/mainGamePlayLocalizeString';
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
  matchesList: {
    fontSize: fontSizes.extraSmall,
    fontFamily: fontName.sourceSansProRegular,
    paddingVertical: spacing.extraExtraSmall,
    color: UIColors.focused,
    backgroundColor: UIColors.newAppGrayContentColor,
    flex: 1,
  },
  matchButton: {
    flex: 1,
    padding: 10,
  },
  flatListStyle: {
    backgroundColor: UIColors.newAppGrayContentColor,
  },
  cellView: {
    flex: 1,
  },
  seperator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: UIColors.primaryText,
  },
});

const Tournaments = (props) => {
  const { tournaments } = props;
  return (
    <View style={styles.listContainer}>
      {tournaments.length !== 0 ? <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={tournaments}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={props.refreshTournaments}
          />
        }
        renderItem={itemData => (
          <View>
            <Text style={styles.SectionHeader}> {itemData.item.title} </Text>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              style={styles.flatListStyle}
              key={props.isPortrait ? 'v' : 'h'}
              data={formateData(itemData.item.data, 3)}
              ItemSeparatorComponent={() => <View style={styles.seperator} />}
              renderItem={({ item }) => {
                if (_.isEmpty(item)) {
                  return <View style={styles.cellView} />;
                }
                const teamInfo = item.settings && item.settings.team_info;
                const teams = _.values(teamInfo);
                const homeTeam = _.find(teams, { qualifier: commonLocalizeStrings.home });
                const awayTeam = _.find(teams, { qualifier: commonLocalizeStrings.away });
                return (
                  <TouchableOpacity
                    style={styles.matchButton}
                    onPress={() => { props.onPressMatch(item, itemData.item); }}
                  >
                    <Text style={styles.matchesList}> {`${homeTeam.name} vs ${awayTeam.name}`} </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
      /> :
      <BackgrounMessage title={mainGAmePlayLocalizeString.noInplayMatches} />
      }
    </View>
  );
};

Tournaments.propTypes = {
  tournaments: PropTypes.array,
  onPressMatch: PropTypes.func,
  refreshTournaments: PropTypes.func,
};

Tournaments.defaultProps = {
  tournaments: [],
  onPressMatch: () => { },
  refreshTournaments: () => { },
};

export default Tournaments;
