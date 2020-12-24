import _ from 'lodash';
import {
  GET_LIVE_CASINO_REQUEST,
  GET_LIVE_CASINO_SUCCESS,
  GET_LIVE_CASINO_FAILURE,
  GET_LIVE_CASINO_INIT_GAME_SESSION_REQUEST,
  GET_LIVE_CASINO_INIT_GAME_SESSION_SUCCESS,
  GET_LIVE_CASINO_INIT_GAME_SESSION_FAILURE,
  LIVE_CASINO_ON_TAB_SELECT,
  ON_LIVE_FREE_SPIN_SELECT,
  ON_LIVE_LOBBY_SELECT,
  ON_LIVE_MOBILE_SELECT,
  SET_LIVE_PROVIDERS_SELECT,
} from '../actions/liveCasinoActions';

const initialState = {
  itemsList: [],
  types: [],
  metaData: [],
  currentLiveCasinoList: [],
  gameSessionUrl: '',
  gameSessionError: '',
  isLoadingLiveCasinoList: false,
  isLoadingLiveCasinoGame: false,
  typeSelected: {},
  freeSpinSelected: '',
  lobbySelected: '',
  mobileSelected: '',
  providersSelected: [],
  providersFilters: {},
  categoryFilters: [],
};

function liveCasino(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case GET_LIVE_CASINO_REQUEST:
      return {
        ...state,
        isLoadingLiveCasinoList: true,
      };
      // eslint-disable-next-line no-case-declarations
    case GET_LIVE_CASINO_SUCCESS:
      const { meta, items } = action.data;
      const list = meta.current_page === 1 ? items : [...state.itemsList, ...items];
      return {
        ...state,
        providersFilters: action.data.filters && action.data.filters.all_providers,
        categoryFilters: action.data.filters && action.data.filters.category,
        types: action.data.menus,
        itemsList: list,
        meta: action.data.meta,
        isLoadingLiveCasinoList: false,
      };
    case GET_LIVE_CASINO_FAILURE:
      return {
        ...state,
        isLoadingLiveCasinoList: false,
      };
    case GET_LIVE_CASINO_INIT_GAME_SESSION_REQUEST:
      return {
        ...state,
        isLoadingLiveCasinoGame: true,
      };
    case GET_LIVE_CASINO_INIT_GAME_SESSION_SUCCESS:
      return {
        ...state,
        isLoadingLiveCasinoGame: false,
        gameSessionUrl: action.data.url,
        gameSessionError: action.data.errors,
      };
    case GET_LIVE_CASINO_INIT_GAME_SESSION_FAILURE:
      return {
        ...state,
        isLoadingLiveCasinoGame: false,
      };
    case LIVE_CASINO_ON_TAB_SELECT:
      return {
        ...state,
        typeSelected: action.tab,
      };
    case ON_LIVE_FREE_SPIN_SELECT:
      return {
        ...state,
        freeSpinSelected: state.freeSpinSelected ?  '': true,
      };
    case ON_LIVE_LOBBY_SELECT:
      return {
        ...state,
        lobbySelected: state.lobbySelected ? '' : true,
      };
    case ON_LIVE_MOBILE_SELECT:
      return {
        ...state,
        mobileSelected: state.mobileSelected ? '' : true,
      };
    case SET_LIVE_PROVIDERS_SELECT:
      return {
        ...state,
        providersSelected: action.providersList,
      };
    default:
      return state;
  }
}

export default liveCasino;
