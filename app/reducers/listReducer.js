import _ from 'lodash';
import {
  GET_COUNTRY_LIST_REQUEST,
  GET_COUNTRY_LIST_SUCCESS,
  GET_COUNTRY_LIST_FAILURE,
  GET_TOURNAMENT_LIST_REQUEST,
  GET_TOURNAMENT_LIST_SUCCESS,
  GET_TOURNAMENT_LIST_FAILURE,
  GET_MATCH_LIST_REQUEST,
  GET_MATCH_LIST_SUCCESS,
  GET_MATCH_LIST_FAILURE,
  GET_ALL_MARKETS_REQUEST,
  GET_ALL_MARKETS_SUCCESS,
  GET_ALL_MARKETS_FAILURE,
  GET_ALL_SPORTS_REQUEST,
  GET_ALL_SPORTS_SUCCESS,
  GET_ALL_SPORTS_FAILURE,
} from '../actions/listsAction';

const initialState = {
  isLoadingLBoard: false,
  sports: [],
  countries: [],
  tournaments: [],
  matches: [],
  allMarkets: [],
  isLoading: false,
  metaData: {},
};

function listDataReducer(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case GET_ALL_SPORTS_REQUEST:
      return {
        ...state,
        isLoadingLBoard: true,
      };
    case GET_ALL_SPORTS_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      return {
        ...state,
        isLoadingLBoard: false,
        sports: action.data.sports,
      };
    case GET_ALL_SPORTS_FAILURE:
      return {
        ...state,
        isLoadingLBoard: false,
      };
    case GET_COUNTRY_LIST_REQUEST:
      return {
        ...state,
        isLoadingLBoard: true,
      };
    case GET_COUNTRY_LIST_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const country = action.data.countries;
      return {
        ...state,
        isLoadingLBoard: false,
        countries: country,
      };
    case GET_COUNTRY_LIST_FAILURE:
      return {
        ...state,
        isLoadingLBoard: false,
      };
    case GET_TOURNAMENT_LIST_REQUEST:
      return {
        ...state,
        isLoadingLBoard: true,
      };
    case GET_TOURNAMENT_LIST_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const tournament = action.data.tournaments;
      return {
        ...state,
        tournaments: tournament,
        isLoadingLBoard: false,
      };
    case GET_TOURNAMENT_LIST_FAILURE:
      return {
        ...state,
        isLoadingLBoard: false,
      };
    case GET_MATCH_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_MATCH_LIST_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const meta = action.data.meta;
      const matches = action.data.matches;
      const matchList = meta.current_page === 1 ? matches : [...state.matches, ...matches];
      return {
        ...state,
        matches: matchList,
        isLoading: false,
        metaData: meta,
      };
    case GET_MATCH_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case GET_ALL_MARKETS_REQUEST:
      return {
        ...state,
        isLoadingLBoard: true,
      };
    case GET_ALL_MARKETS_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      // const country = action.data.countries;
      return {
        ...state,
        isLoadingLBoard: false,
        allMarkets: action.data.markets,
      };
    case GET_ALL_MARKETS_FAILURE:
      return {
        ...state,
        isLoadingLBoard: false,
      };
    default:
      return state;
  }
}

function filterMatches(data) {
  let outcomes
  let outcomesList = {};
  let key1, key2, key3, keyObject1, keyObject2, keyObject3;
  data.forEach(element => {
    
    let outcomes = element.market === null || Object.keys(element.market) === 0 ? {} : element.market.outcomes;

    Object.keys(outcomes).forEach((key) => {
      if (outcomes[key].name === "1") {
        key1 = key;
        keyObject1 = outcomes[key]
      }
      else if (outcomes[key].name === "X") {
        key2 = key;
        keyObject2 = outcomes[key]
      }
      else if (outcomes[key].name === "2") {
        key3 = key;
        keyObject3 = outcomes[key]
      }
    })
    outcomesList[key1] = keyObject1;
    outcomesList[key2] = keyObject2;
    outcomesList[key3] = keyObject3;
    if(element.market !== null) {
      element.market.outcomes = outcomesList;
    }
    outcomesList = {};
  });

  return data;
}

export default listDataReducer;
