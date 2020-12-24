import _ from 'lodash';

export const period = {
  FIVE_MINUTES: 'five_minutes',
  TEN_MINUTES: 'ten_minutes',
  FIFTEEN_MINUTES: 'fifteen_minutes',
  FIRST_HALF: 'first_half',
  SECOND_HALF: 'second_half',
};

export const betType = {
  THREE_WAY: '3 Way',
  NO_BET: 'No Bet',
  DOUBLE_CHANCE: 'Double Chance',
  HANDICAP: 'Handicap',
  PROP: 'Prop',
  EXACT: 'Exact',
  NEXT_LAST: 'Next/Last',
  OVER_UNDER: 'Over/Under',
  ODD_EVEN: 'Odd/Even',
  MARGIN: 'Margin',
  HIGHEST_SCORING_HALF: 'Highest Scoring Half',
  MOST: 'Most',
  LINES: 'Lines',
  CORRECT: 'Correct',
};

export const getNewTeamMarket = (
  teamData,
  marketFilters,
  selectedBetID,
  selectedPlayID,
) => {
  const newFilteredMarkets = [];
  _.forEach(marketFilters, (market) => {
    _.forEach(teamData, (id) => {
      if (market.id === id
        && market.bet_type
        && selectedBetID === market.bet_type.id
        && market.play_type
        && selectedPlayID === market.play_type.id) {
        newFilteredMarkets.push(id);
      }
    });
  });
  return newFilteredMarkets;
};

export const marketsValue = (allData, data, selectedPeriodID) => {
  const markets = [];
  // filter markets based on selection of periods
  allData && allData.forEach((id) => {
    // const selectedPeriodID = this.props.mainGamePlay.selectedPeriod.id;
    let marketValue; // used to render market
    let marketKeys; // used to get the id rendered markets
    if (selectedPeriodID === period.FIVE_MINUTES
      || selectedPeriodID === period.TEN_MINUTES
      || selectedPeriodID === period.FIFTEEN_MINUTES) {
      if (_.values(data[id]).length > 1) {
        marketValue = _.values(data[id]).slice(Math.max(_.values(data[id]).length - 1, 1));
        marketKeys = _.keys(data[id]).slice(Math.max(_.keys(data[id]).length - 1, 1));
      } else {
        marketValue = _.values(data[id]); // used to render market
        marketKeys = _.keys(data[id]); // used to get the id rendered markets
      }
    } else {
      marketValue = _.values(data[id]); // used to render market
      marketKeys = _.keys(data[id]); // used to get the id rendered markets
    }
    // filtered object to push into the market outcomes
    const marketsWithCommonOutcomes = {
      status: '',
      name: '',
      outcomes: [],
      isMarketActive: true,
    };
    // filter out selected markets
    marketValue.forEach((value, keyMarketValue) => {
      const marketIdentifier = marketKeys[keyMarketValue]; // extract market identifier
      marketsWithCommonOutcomes.name = value.name; // extract market name
      marketsWithCommonOutcomes.status = value.status; // status: 0, 1, -1
      marketsWithCommonOutcomes.uid = value.uid;
      marketsWithCommonOutcomes.isMarketActive = value.status === '1';
      const outcomeIds = _.keys(value.outcomes); // outcome id list
      // merging all outcomes for common market names
      _.values(value.outcomes).forEach((outcomesValue, key) => {
        const newOutcome = outcomesValue;
        newOutcome.outcomeID = outcomeIds[key];
        newOutcome.marketIdentifier = marketIdentifier;
        newOutcome.marketStatus = value.status;
        newOutcome.marketId = id;
        newOutcome.isMarketActive = outcomesValue.status === '1';
        newOutcome.specifier = value.specifier;
        newOutcome.uniqID = marketIdentifier + id + outcomeIds[key];
        marketsWithCommonOutcomes.outcomes.push(newOutcome); // actual filtered outcomes
      });
    });
    marketValue.length > 0 && markets.push({ id, ...marketsWithCommonOutcomes }); // actual filtered market
  });
  // if (fromAbly) {
  //   this.updateOdds(markets);
  // }
  return markets;
};

const getGroupedOutcomesForOverAndUnder = (marketOutcomes) => {
  if (_.isEmpty(marketOutcomes)) {
    return [];
  }
  const outcomeValues = _
    .chain(marketOutcomes.outcomes)
    .map(outcome => _.last(outcome.name.split(' ')))
    .uniq()
    .value();

  const groupedOutcomes = [];
  outcomeValues.forEach((value) => {
    const group = {};
    group.type = value;
    group.value = [];
    marketOutcomes.outcomes.forEach((outcome) => {
      if (_.last(outcome.name.split(' ')) === value) {
        group.value.push(outcome);
      }
    });
    groupedOutcomes.push(group);
  });
  return groupedOutcomes;
};

const rearrangeOutcomesForMarkets = (markets, teamOptions) => {
  const updatedmarkets = _.map(markets, (mrkt) => {
    const newMrkt = Object.assign(mrkt);
    const outcomes = [];
    const outcomeHome = _.find(mrkt.outcomes, { name: teamOptions.home });
    const outcomeAway = _.find(mrkt.outcomes, { name: teamOptions.visitor });
    const outcomeNone = _.filter(mrkt.outcomes, outcome => (outcome.name !== teamOptions.home && outcome.name !== teamOptions.visitor));
    if (outcomeHome) {
      outcomes.push(outcomeHome);
    } else {
      outcomes.push({});
    }
    if (outcomeAway) {
      outcomes.push(outcomeAway);
    } else {
      outcomes.push({});
    }
    if (_.head(outcomeNone)) {
      outcomes.push(_.head(outcomeNone));
    } else {
      outcomes.push({});
    }
    newMrkt.outcomes = outcomes;
    return newMrkt;
  });
  return updatedmarkets;
};

export const createLevelOneMarketData = (data, mainGamePlay, selectedPlayType) => {
  // if (Object.keys(data.markets).length != 0) {
  const {
    marketIdHomeTeam,
    marketIdVisitorTeam,
    marketIdBothTeams,
    selectedBetType,
    selectedPeriod,
    marketFilter,
  } = mainGamePlay;

  if (!_.isEmpty(data)) {
    const marketDataHome = getNewTeamMarket(
      marketIdHomeTeam[selectedPeriod.id].all,
      marketFilter,
      selectedBetType.id,
      selectedPlayType.id,
    );
    const marketDataAway = getNewTeamMarket(
      marketIdVisitorTeam[selectedPeriod.id].all,
      marketFilter,
      selectedBetType.id,
      selectedPlayType.id,
    );
    const marketDataBoth = getNewTeamMarket(
      marketIdBothTeams[selectedPeriod.id].all,
      marketFilter,
      selectedBetType.id,
      selectedPlayType.id,
    );

    const marketsHome = marketsValue(marketDataHome, data, selectedPeriod.id);
    const marketAway = marketsValue(marketDataAway, data, selectedPeriod.id);
    const marketBoth = marketsValue(marketDataBoth, data, selectedPeriod.id);

    let groupedOutcomeForBoth = {};
    let groupedOutcomeForHome = {};
    let groupedOutcomeForAway = {};

    switch (selectedBetType.name) {
      case (betType.OVER_UNDER):
        groupedOutcomeForBoth = getGroupedOutcomesForOverAndUnder(_.head(marketBoth));
        groupedOutcomeForHome = getGroupedOutcomesForOverAndUnder(_.head(marketsHome));
        groupedOutcomeForAway = getGroupedOutcomesForOverAndUnder(_.head(marketAway));
        break;
      case betType.EXACT:
        groupedOutcomeForBoth = _.head(marketBoth);
        groupedOutcomeForHome = _.head(marketsHome);
        groupedOutcomeForAway = _.head(marketAway);
        break;
      case betType.DOUBLE_CHANCE:
      case betType.NEXT_LAST:
      case betType.ODD_EVEN:
      case betType.MARGIN:
      case betType.CORRECT:
      case betType.NO_BET:
        groupedOutcomeForBoth = _.isEmpty(_.head(marketBoth)) ? [] : _.head(marketBoth);
        groupedOutcomeForHome = _.isEmpty(_.head(marketsHome)) ? [] : _.head(marketsHome);
        groupedOutcomeForAway = _.isEmpty(_.head(marketAway)) ? [] : _.head(marketAway);
        break;

      case betType.PROP:
        groupedOutcomeForBoth = marketBoth;
        groupedOutcomeForHome = marketsHome;
        groupedOutcomeForAway = marketAway;
        break;

      default:
        break;
    }

    if (marketsHome.length > 0 || marketAway.length > 0 || marketBoth.length > 0) {
      const marketsForNewTemplates = {
        competitor1: groupedOutcomeForHome,
        competitor2: groupedOutcomeForAway,
        both: groupedOutcomeForBoth,
      };
      return marketsForNewTemplates;
    }
    return {};
  }
  return {};
};

export const createLevelTwoMarketData = (data, mainGamePlay, selectedPlayType) => {
  const {
    marketIdBothTeams,
    selectedBetType,
    selectedPeriod,
    marketFilter,
  } = mainGamePlay;
  if (!_.isEmpty(data)) {
    const marketData = getNewTeamMarket(
      marketIdBothTeams[selectedPeriod.id].all,
      marketFilter,
      selectedBetType.id,
      selectedPlayType.id,
    );
    const markets = marketsValue(marketData, data, selectedPeriod.id);
    if (markets.length > 0) {
      return markets;
    }
    return [];
  }
  return [];
};

export const showOverUnderMarket = (markets, mainGamePlay, selectedPlayType) => {
  const overUnderMarkets = createLevelOneMarketData(markets, mainGamePlay, selectedPlayType);
  if (!_.isEmpty(overUnderMarkets)) {
    const market = {
      type: betType.OVER_UNDER,
      data: overUnderMarkets,
    };
    // this.setState({ showTemplateForMarket: market });
    return market;
  }
  return {};
};

export const showExactMarket = (markets, mainGamePlay, selectedPlayType) => {
  const exactMarkets = createLevelOneMarketData(markets, mainGamePlay, selectedPlayType);
  if (!_.isEmpty(exactMarkets)) {
    const market = {
      type: betType.EXACT,
      data: exactMarkets,
    };
    return market;
  }
  return {};
};

export const showDoubleChanceMarket = (markets, mainGamePlay, selectedPlayType) => {
  const doubleChanceMarkets = createLevelOneMarketData(markets, mainGamePlay, selectedPlayType);
  if (!_.isEmpty(doubleChanceMarkets)) {
    const market = {
      type: betType.DOUBLE_CHANCE,
      data: doubleChanceMarkets,
    };
    return market;
  }
  return {};
};

export const showNextLastMarket = (markets, mainGamePlay, selectedPlayType) => {
  const nextLastMarkets = createLevelTwoMarketData(markets, mainGamePlay, selectedPlayType);
  const updatedNextLastMarkets = rearrangeOutcomesForMarkets(nextLastMarkets, mainGamePlay.teamOptions);
  if (!_.isEmpty(updatedNextLastMarkets)) {
    const market = {
      type: betType.NEXT_LAST,
      data: updatedNextLastMarkets,
    };
    return market;
  }
  return {};
};

export const showOddEvenMarket = (markets, mainGamePlay, selectedPlayType) => {
  const overUnderMarkets = createLevelOneMarketData(markets, mainGamePlay, selectedPlayType);
  if (!_.isEmpty(overUnderMarkets)) {
    const market = {
      type: betType.ODD_EVEN,
      data: overUnderMarkets,
    };
    return market;
  }
  return {};
};

export const showThreeWayMarket = (markets, mainGamePlay, selectedPlayType) => {
  const threeWayMarkets = createLevelTwoMarketData(markets, mainGamePlay, selectedPlayType);
  const updatedThreeWay = rearrangeOutcomesForMarkets(threeWayMarkets, mainGamePlay.teamOptions);
  if (!_.isEmpty(updatedThreeWay)) {
    const market = {
      type: betType.THREE_WAY,
      data: updatedThreeWay,
    };
    return market;
  }
  return {};
};

export const showPropsMarket = (markets, mainGamePlay, selectedPlayType) => {
  const overUnderMarkets = createLevelOneMarketData(markets, mainGamePlay, selectedPlayType);
  if (!_.isEmpty(overUnderMarkets)) {
    const market = {
      type: betType.PROP,
      data: overUnderMarkets,
    };
    return market;
  }
  return {};
};

export const showMostMarket = (markets, mainGamePlay, selectedPlayType) => {
  const MostMarkets = createLevelTwoMarketData(markets, mainGamePlay, selectedPlayType);
  const updatedMostMarkets = rearrangeOutcomesForMarkets(MostMarkets, mainGamePlay.teamOptions);
  if (!_.isEmpty(updatedMostMarkets)) {
    const market = {
      type: betType.MOST,
      data: updatedMostMarkets,
    };
    return market;
  }
  return {};
};

export const showNoBetMarket = (markets, mainGamePlay, selectedPlayType) => {
  const noBetsMarkets = createLevelOneMarketData(markets, mainGamePlay, selectedPlayType);
  if (!_.isEmpty(noBetsMarkets)) {
    const market = {
      type: betType.NO_BET,
      data: noBetsMarkets,
    };
    return market;
  }
  return {};
};

export const showMarginMarket = (markets, mainGamePlay, selectedPlayType) => {
  const marginMarkets = createLevelOneMarketData(markets, mainGamePlay, selectedPlayType);
  if (!_.isEmpty(marginMarkets)) {
    const market = {
      type: betType.MARGIN,
      data: marginMarkets,
    };
    return market;
  }
  return {};
};

export const showHandicapMarket = (markets, mainGamePlay, selectedPlayType) => {
  const handicapMarkets = createLevelTwoMarketData(markets, mainGamePlay, selectedPlayType);
  const handicap = _.head(handicapMarkets);
  if (!_.isEmpty(handicap)) {
    const { outcomes } = handicap;
    const handicapGroupedMarkets = _
      .chain(outcomes)
      .groupBy('specifier.hcp')
      .mapKeys((value, key) => {
        const ids = key.split(':');
        let name = '';
        if (_.head(ids) === '0') {
          name = `${_.upperCase(mainGamePlay.teamOptions.visitor)} +${_.last(ids)}`
        } else {
          name = `${_.upperCase(mainGamePlay.teamOptions.home)} +${_.head(ids)}`
        }
        return name;
      })
      .value();
    const market = {
      type: betType.HANDICAP,
      data: handicapGroupedMarkets,
    };
    return market;
  }
  return {};
};

export const showCorrectMarkets = (markets, mainGamePlay, selectedPlayType) => {
  const correctMarkets = createLevelTwoMarketData(markets, mainGamePlay, selectedPlayType);
  const correct = _.head(correctMarkets);

  if (!_.isEmpty(correctMarkets)) {
    const { outcomes } = correct;
    const homeData = [];
    const awayData = [];
    const bothData = [];
    const dataArray = [];
    _
      .chain(outcomes)
      .mapKeys((value) => {
        const ids = value.name.split(':');
        if (ids[0] > ids[1]) {
          homeData.push(value);
        } else if (ids[0] < ids[1]) {
          awayData.push(value);
        } else {
          bothData.push(value);
        }
        return dataArray;
      })
      .value();
    const obj = {};
    obj.home = homeData;
    obj.away = awayData;

    const index = _.findIndex(bothData, { name: 'other' });
    if (index > -1) {
      const otherObject = bothData[index];
      bothData.splice(index, 1);
      bothData.unshift(otherObject);
    }
    obj.both = bothData;
    dataArray.push(obj);
    const market = {
      type: betType.CORRECT,
      data: dataArray,
    };
    return market;
  }
  return {};
};

// players
export const getNewTeamPlayersMarket = (marketFilters, selectedPlayType) => {
  const newFilteredMarkets = [];
  _.forEach(marketFilters, (market) => {
    // forEach(data, (id) => {
    if (market.bet_type
      && market.play_type
      && selectedPlayType.id === market.play_type.id) {
      newFilteredMarkets.push(market.id);
    }
    // });
  });
  return newFilteredMarkets;
};

export const marketsValuesForPlayers = (allData, data, selectedPlayer) => {
  const markets = [];
  // filter markets based on selection of periods
  allData && allData.forEach((id) => {
    const marketValue = _.values(data[id]); // used to render market
    const marketKeys = _.keys(data[id]); // used to get the id rendered markets
    // filtered object to push into the market outcomes
    const marketsWithCommonOutcomes = {
      status: '',
      name: '',
      outcomes: [],
      isMarketActive: true,
    };
    // filter out selected markets
    marketValue.forEach((value, keyMarketValue) => {
      const marketIdentifier = marketKeys[keyMarketValue]; // extract market identifier
      marketsWithCommonOutcomes.name = value.name; // extract market name
      marketsWithCommonOutcomes.status = value.status; // status: 0, 1, -1
      marketsWithCommonOutcomes.uid = value.uid;
      marketsWithCommonOutcomes.player_id = value.player_id;
      marketsWithCommonOutcomes.isMarketActive = value.status === '1';
      const outcomeIds = _.keys(value.outcomes); // outcome id list
      // merging all outcomes for common market names
      _.values(value.outcomes).forEach((outcomesValue, key) => {
        if (value.player_id === selectedPlayer.id) {
          const newOutcome = outcomesValue;
          newOutcome.outcomeID = outcomeIds[key];
          newOutcome.marketIdentifier = marketIdentifier;
          newOutcome.marketStatus = value.status;
          newOutcome.player_id = value.player_id;
          newOutcome.marketId = id;
          newOutcome.isMarketActive = outcomesValue.status === '1';
          newOutcome.uniqID = marketIdentifier + id + outcomeIds[key];
          marketsWithCommonOutcomes.outcomes.push(newOutcome); // actual filtered outcomes
        }
      });
    });
    marketValue.length > 0 && markets.push({ id, ...marketsWithCommonOutcomes }); // actual filtered market
  });
  // const newUpdatedMarket = markets.filter(mrkt => mrkt.player_id === selectedPlayer.id);

  // if (fromAbly) {
  //   this.updateOdds(markets);
  // }
  return markets;
};

export const createPlayerMarket = (marketFilters, data, selectedPlayer, selectedPlayType) => {
  // if (Object.keys(data.markets).length != 0) {
  if (!_.isEmpty(data)) {
    const marketData = getNewTeamPlayersMarket(marketFilters, selectedPlayType);
    const markets = marketsValuesForPlayers(marketData, data, selectedPlayer);
    if (markets.length > 0) {
      return markets;
    }
    return [];
  }
  return [];
};

export const createVoiceMarketData = (
  marketFilter,
  data,
  selectedPeriodID,
  selectedBetID,
  selectedPlayID,
  teamData,
) => {
  if (!_.isEmpty(data)) {
    const marketDataHome = getNewTeamMarket(
      teamData.marketIdHomeTeam[selectedPeriodID].all,
      marketFilter,
      selectedBetID,
      selectedPlayID,
    );
    const marketDataAway = getNewTeamMarket(
      teamData.marketIdVisitorTeam[selectedPeriodID].all,
      marketFilter,
      selectedBetID,
      selectedPlayID,
    );
    const marketDataBoth = getNewTeamMarket(
      teamData.marketIdBothTeams[selectedPeriodID].all,
      marketFilter,
      selectedBetID,
      selectedPlayID,
    );
    let markets = [];
    const marketsHome = marketsValue(marketDataHome, data, selectedPeriodID);
    const marketsAway = marketsValue(marketDataAway, data, selectedPeriodID);
    const marketsBoth = marketsValue(marketDataBoth, data, selectedPeriodID);
    markets = _.concat(marketsHome, marketsAway, marketsBoth);
    if (markets.length > 0) {
      return markets;
    }
    return [];
  }
  return [];
};

export const getMarkets = (markets, mainGamePlay, selectedPlayType) => {
  let marketToDisplay = {};
  switch (mainGamePlay.selectedBetType.name) {
    case betType.OVER_UNDER:
      marketToDisplay = showOverUnderMarket(markets, mainGamePlay, selectedPlayType);
      break;
    case betType.EXACT:
      marketToDisplay = showExactMarket(markets, mainGamePlay, selectedPlayType);
      break;
    case betType.DOUBLE_CHANCE:
      marketToDisplay = showDoubleChanceMarket(markets, mainGamePlay, selectedPlayType);
      break;
    case betType.NEXT_LAST:
      marketToDisplay = showNextLastMarket(markets, mainGamePlay, selectedPlayType);
      break;
    case betType.ODD_EVEN:
      marketToDisplay = showOddEvenMarket(markets, mainGamePlay, selectedPlayType);
      break;
    case betType.THREE_WAY:
      marketToDisplay = showThreeWayMarket(markets, mainGamePlay, selectedPlayType);
      break;
    case betType.PROP:
      marketToDisplay = showPropsMarket(markets, mainGamePlay, selectedPlayType);
      break;
    case betType.MOST:
      marketToDisplay = showMostMarket(markets, mainGamePlay, selectedPlayType);
      break;
    case betType.NO_BET:
      marketToDisplay = showNoBetMarket(markets, mainGamePlay, selectedPlayType);
      break;
    case betType.MARGIN:
      marketToDisplay = showMarginMarket(markets, mainGamePlay, selectedPlayType);
      break;
    case betType.HANDICAP:
      marketToDisplay = showHandicapMarket(markets, mainGamePlay, selectedPlayType);
      break;
    case betType.CORRECT:
      marketToDisplay = showCorrectMarkets(markets, mainGamePlay, selectedPlayType);
      break;
    default:
      break;
  }
  return marketToDisplay;
};
