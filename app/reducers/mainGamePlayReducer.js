/* eslint no-underscore-dangle: 0 */
import _ from 'lodash';
import {
  GET_SPORTS_SUCCESS,
  GET_SPORTS_FAILURE,
  GET_TOURNAMENTS_WITH_MATCHES_SUCCESS,
  GET_TOURNAMENTS_WITH_MATCHES_FAILURE,
  GET_TOURNAMENTS_WITH_MATCHES_INPLAY_SUCCESS,
  GET_TOURNAMENTS_WITH_MATCHES_INPLAY_FAILURE,
  GET_TOURNAMENTS_WITH_MATCHES_TODAY_SUCCESS,
  GET_TOURNAMENTS_WITH_MATCHES_TODAY_FAILURE,
  ON_MATCH_PRESS,
  ON_SELECT_SPORT,
  SET_BET_SLIPS,
  DELETE_BET_SLIPS,
  CLEAR_ALL_BET_SLIPS,
  SET_BET_SLIP_CONTAINER_VISIBILITY,
  SET_TOURNAMENTS_FILTER_TYPE,
  SET_ENTER_STAKE_VALUE_IN_BET_SLIP,
  UPDATE_BET_SLIPS,
  GET_MARKETS_FOR_SELECTED_MATCH_FAILURE,
  GET_MARKETS_FOR_SELECTED_MATCH_SUCCESS,
  GET_BETS_REQUEST,
  GET_BETS_SUCCESS,
  GET_BETS_FAILURE,
  GET_MY_BETS_REQUEST,
  GET_MY_BETS_SUCCESS,
  GET_MY_BETS_FAILURE,
  UPDATE_MARKETS,
  UPDATE_SELECTED_MATCH_SCORE_AND_TIME,
  ON_BETSLIP_ODDS_CHANGE,
  POST_CASHOUT_BET_REQUEST,
  POST_CASHOUT_BET_SUCCESS,
  POST_CASHOUT_BET_FAILURE,
  CASHOUT_MISMATCH_ERROR,
  POST_BETSLIP_REQUEST,
  POST_BETSLIP_SUCCESS,
  POST_BETSLIP_FAILURE,
} from '../actions/mainGamePlayAction';
import {
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_FAILURE,
  
} from '../actions/dashboard';
import { getStakeValues, getBetslipsAfterOddsChange, getCurrentComboBetAndFolds } from '../utils/utils_functions';
import { showOptionForBets, TournamentFilterType } from '../utils/enum';

const initialState = {
  tournamentFilterType: TournamentFilterType.Sports,
  tournamentList: [],
  inPlayTournamentList: [],
  todayTournamentList: [],
  isLoading: false,
  selectedTournament: {},
  selectedMatch: {},
  selectedMatchRunningScore: '',
  selectedMatchRunningTime: '',
  accountPoints: 0,
  isLoadingPlaceBet: false,
  isLoadingGetBets: false,
  isLoadingMyGetBets: false,
  matchMarketData: [],
  sports: [],
  isShowMarkets: false,
  selectedSport: { id: 1, name: 'Soccer' },
  betSlips: [],
  showBetSlipContainer: showOptionForBets.NONE,
  showEnterStakeContainer: false,
  betPlaced: [],
  myBets: [],
  betSlipsOddsChanged: false,
  netOddsForComboBet: 0,
  foldsInBetSlip: 1,
};

function mainGamePlay(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case GET_BETS_REQUEST:
      return {
        ...state,
        isLoadingGetBets: true,
      };
    // eslint-disable-next-line no-case-declarations
    case GET_BETS_SUCCESS:
      const { meta, bets } = action.data;
      const list = meta.current_page === 1 ? bets : [...state.betPlaced, ...bets];
      return {
        ...state,
        isLoadingGetBets: false,
        betPlaced: list,
        meta: action.data.meta,
        // betPlaced: action.data && action.data.bets,
      };
    case GET_BETS_FAILURE:
      return {
        ...state,
        isLoadingGetBets: false,
      };
    case GET_MY_BETS_REQUEST:
      return {
        ...state,
        isLoadingMyGetBets: true,
      };
    // eslint-disable-next-line no-case-declarations
    case GET_MY_BETS_SUCCESS:
      const myBetsMeta = action.data.meta;
      const myBets = action.data.bets;
      const myList = myBetsMeta.current_page === 1 ? myBets : [...state.myBets, ...myBets];
      return {
        ...state,
        isLoadingMyGetBets: false,
        myBets: myList,
        myBetsMeta: action.data.meta,
        // betPlaced: action.data && action.data.bets,
      };
    case GET_MY_BETS_FAILURE:
      return {
        ...state,
        isLoadingMyGetBets: false,
      };
    case GET_MARKETS_FOR_SELECTED_MATCH_FAILURE:
      return {
        ...state,
      };
    case GET_MARKETS_FOR_SELECTED_MATCH_SUCCESS:
      return {
        ...state,
        marketsResponse: action.data,
        matchMarketData: action.data.markets,
        selectedMatchRunningScore: action.data.running_score,
        selectedMatchRunningTime: action.data.running_time,
        selectedMatch: { ...state.selectedMatch, status: action.data.match_status },
        isShowMarkets: false,
      };
    case UPDATE_MARKETS:
      return {
        ...state,
        matchMarketData: action.data,
      };
    case UPDATE_SELECTED_MATCH_SCORE_AND_TIME:
      return {
        ...state,
        selectedMatchRunningScore: action.score,
        selectedMatchRunningTime: action.time,
      };
    case UPDATE_BET_SLIPS:
      return {
        ...state,
        betSlips: action.betSlips,
      };
    case SET_ENTER_STAKE_VALUE_IN_BET_SLIP:
      return {
        ...state,
        showEnterStakeContainer: action.isEnterStakeShow,
      };
    case SET_BET_SLIP_CONTAINER_VISIBILITY:
      return {
        ...state,
        showBetSlipContainer: action.option,
      };
    case SET_TOURNAMENTS_FILTER_TYPE:
      return {
        ...state,
        tournamentFilterType: action.option,
        isShowMarkets: false,
      };
    // eslint-disable-next-line no-case-declarations
    case SET_BET_SLIPS:
      const newBetSlips = _.assign([], state.betSlips);
      newBetSlips.push(action.betSlip);
      const newComboOddsAndFolds = getCurrentComboBetAndFolds(newBetSlips);
      return {
        ...state,
        betSlips: newBetSlips,
        netOddsForComboBet: newComboOddsAndFolds.netOddsForComboBet,
        foldsInBetSlip: newComboOddsAndFolds.foldsInBetSlip,
      };
    // eslint-disable-next-line no-case-declarations
    case DELETE_BET_SLIPS:
      const updatedBetSlips = _.assign([], state.betSlips);
      _.remove(updatedBetSlips, slip =>
        (slip.id === action.betSlip.id && slip.marketID === action.betSlip.marketID && slip.matchID === action.betSlip.matchID));
      // eslint-disable-next-line no-redeclare
      const comboData = getCurrentComboBetAndFolds(updatedBetSlips);
      return {
        ...state,
        betSlips: updatedBetSlips,
        netOddsForComboBet: comboData.netOddsForComboBet,
        foldsInBetSlip: comboData.foldsInBetSlip,
      };
    case CLEAR_ALL_BET_SLIPS:
      return {
        ...state,
        betSlips: [],
      };
    case ON_SELECT_SPORT:
      return {
        ...state,
        // selectedSport: action.selectedSport,
        isShowMarkets: false,
        showBetSlipContainer: showOptionForBets.NONE,
      };
    // eslint-disable-next-line no-case-declarations
    case ON_MATCH_PRESS:
      const isLiveMatch = action.selectedMatch.status === 'in_progress';
      const liveMatchSetings = isLiveMatch ? action.selectedMatch.settings : {};
      const score = liveMatchSetings ? liveMatchSetings.score : '';
      const time = liveMatchSetings ? liveMatchSetings.running_time : '';
      return {
        ...state,
        selectedMatch: action.selectedMatch,
        selectedTournament: action.selectedTournament,
        selectedMatchRunningScore: score,
        selectedMatchRunningTime: time,
        isShowMarkets: true,
      };
    case GET_SPORTS_SUCCESS:
      return {
        ...state,
        sports: action.data,
      };
    case GET_SPORTS_FAILURE:
      return {
        ...state,
      };
    case GET_TOURNAMENTS_WITH_MATCHES_SUCCESS:
      return {
        ...state,
        tournamentsList: action.data,
      };
    case GET_TOURNAMENTS_WITH_MATCHES_FAILURE:
      return {
        ...state,
      };
    case GET_TOURNAMENTS_WITH_MATCHES_INPLAY_SUCCESS:
      return {
        ...state,
        inPlayTournamentList: action.data,
      };
    case GET_TOURNAMENTS_WITH_MATCHES_INPLAY_FAILURE:
      return {
        ...state,
      };
    case GET_TOURNAMENTS_WITH_MATCHES_TODAY_SUCCESS:
      return {
        ...state,
        todayTournamentList: action.data,
      };
    case GET_TOURNAMENTS_WITH_MATCHES_TODAY_FAILURE:
      return {
        ...state,
      };
    // eslint-disable-next-line no-case-declarations
    case GET_ACCOUNT_SUCCESS:
      const values = getStakeValues(action.data.point);
      return {
        ...state,
        accountPoints: action.data.point,
        stakeValues: values,
      };
    case GET_ACCOUNT_FAILURE:
      return {
        ...state,
      };

    case POST_BETSLIP_REQUEST:
      return {
        ...state,
        isLoadingPlaceBet: true,
      };
    case POST_BETSLIP_SUCCESS:
      return {
        ...state,
        isLoadingPlaceBet: false,
        betSlips: [],
        showBetSlipContainer: showOptionForBets.NONE,
        postBetSlipFailureOddsResponse: {},
      };
    case POST_BETSLIP_FAILURE:
      return {
        ...state,
        isLoadingPlaceBet: false,
        postBetSlipFailureOddsResponse: action.data,
      };
    case POST_CASHOUT_BET_REQUEST:
      return {
        ...state,
        isLoadingGetBets: true,
      };
    // eslint-disable-next-line no-case-declarations
    case POST_CASHOUT_BET_SUCCESS:
      let updatedSinglePendingBets;
      if (action.betType === 'single') {
        updatedSinglePendingBets = _.assign([], state.betPlaced);
        _.remove(updatedSinglePendingBets, bet =>
          (bet.id === action.bet.id));
      }
      return {
        ...state,
        isLoadingGetBets: false,
        betPlaced: action.betType === 'single' ? updatedSinglePendingBets : state.betPlaced,
      };
    case POST_CASHOUT_BET_FAILURE:
      return {
        ...state,
        isLoadingGetBets: false,
      };
    // eslint-disable-next-line no-case-declarations
    case CASHOUT_MISMATCH_ERROR:
      let updatedSinglePendingBet;
      let betToUpdate;
      if (action.betType === 'single') {
        updatedSinglePendingBet = _.assign([], state.betPlaced);
        betToUpdate = _.find(updatedSinglePendingBet, bet =>
          (bet.id === action.bet.id));
        betToUpdate.cashoutable = action.data.cashoutable.cashoutable;
      }
      return {
        ...state,
        betPlaced: action.betType === 'single' ? updatedSinglePendingBet : state.betPlaced,
      };
    // eslint-disable-next-line no-case-declarations
    case ON_BETSLIP_ODDS_CHANGE:
      const data = getBetslipsAfterOddsChange(state.betSlips, state.postBetSlipFailureOddsResponse.updated_betslips);
      return {
        ...state,
        netOddsForComboBet: data.netOddsForComboBet,
        foldsInBetSlip: data.foldsInBetSlip,
        betSlipsOddsChanged: true,
        betSlips: data.mainBetSlip,
      };

    default:
      return state;
  }
}

export default mainGamePlay;

