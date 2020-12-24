import { createSelector } from 'reselect';
import _ from 'lodash';
import { TournamentFilterType } from '../utils/enum';

const tournaments = (state) => {
  if (state.mainGamePlay.tournamentFilterType === TournamentFilterType.InPlay) {
    return state.mainGamePlay.inPlayTournamentList;
  }
  return state.mainGamePlay.tournamentsList;
};

export const getTournaments = createSelector(
  [tournaments],
  tournamentObj => tournamentObj,
);

