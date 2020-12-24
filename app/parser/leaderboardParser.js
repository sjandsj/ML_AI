import _ from 'lodash';

export const createIndividualLeaderboardData = (data) => {
  const { leaders_board, match_leaderboard } = data;
  const { users } = match_leaderboard;
  const individualUsers = leaders_board.users;
  if (!_.isEmpty(users)) {
    return Object.assign(individualUsers);
  }
  return {};
};

export const createGroupLeaderboardData = (data) => {
  const { match_leaderboard } = data;
  const { groups } = match_leaderboard;
  if (!_.isEmpty(groups)) {
    return Object.assign(groups);
  }
  return {};
};

export const createBothLeaderboardData = (data) => {
  const { match_leaderboard } = data;
  const { users, groups } = match_leaderboard;
  let bothData = [];
  if (!_.isEmpty(users) && !_.isEmpty(groups)) {
    // create data for both
    bothData = _.map(Object.assign(groups), (item) => {
      const usersForBoth = Object.assign(users);
      const newItem = Object.assign(item);
      const mixedData = [];
      const qualifiedUsers = _.map(newItem.qualified_users, (userID) => {
        const userNewQualified = _.assign({}, _.find(usersForBoth, o => o.id === userID));
        userNewQualified.type = 'qualified';
        mixedData.push(userNewQualified);
        return userNewQualified;
      });

      const qualifiedUsersTotal = {
        total: newItem.total,
        pending: newItem.pending,
        resolved: newItem.resolved,
        won: newItem.won,
        average_odds: newItem.average_odds,
        rank_percentage: newItem.rank_percentage,
        type: 'total',
        title: 'Total Qualified',
      };
      newItem.qualified_users.length > 0 && mixedData.push(qualifiedUsersTotal);

      const nonQualifiedUsers = _.map(newItem.not_qualified_users, (nonQUserID) => {
        const userNew = _.assign({}, _.find(usersForBoth, o => o.id === nonQUserID));
        userNew.type = 'non-qualified';
        mixedData.push(userNew);
        return userNew;
      });
      newItem.not_qualified_users = nonQualifiedUsers;
      newItem.qualified_users = qualifiedUsers;
      newItem.data = mixedData;
      return newItem;
    });
    return bothData;
  }
};
