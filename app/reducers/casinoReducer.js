import _ from 'lodash';
import {
  GET_CASINO_REQUEST,
  GET_CASINO_SUCCESS,
  GET_CASINO_FAILURE,
  GET_CASINO_INIT_GAME_SESSION_REQUEST,
  GET_CASINO_INIT_GAME_SESSION_SUCCESS,
  GET_CASINO_INIT_GAME_SESSION_FAILURE,
  ON_TAB_SELECT,
  ON_FREE_SPIN_SELECT,
  ON_LOBBY_SELECT,
  ON_MOBILE_SELECT,
  SET_PROVIDERS_SELECT,
} from '../actions/casinoAction';

const initialState = {
  itemsList: [],
  providersFilters: {},
  categoryFilters: [],
  types: [],
  metaData: [],
  getCasinoResponse: {},
  currentCasinoList: [],
  gameSessionUrl: '',
  gameSessionError: '',
  isLoadingCasinoList: false,
  isLoadingCasinoGame: false,
  typeSelected: '',
  freeSpinSelected: '',
  lobbySelected: '',
  mobileSelected: '',
  providersSelected: [],
};

function casino(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case GET_CASINO_REQUEST:
      return {
        ...state,
        isLoadingCasinoList: true,
      };
      // eslint-disable-next-line no-case-declarations
    case GET_CASINO_SUCCESS:
      const { meta, items } = action.data;
      const list = meta.current_page === 1 ? items : [...state.itemsList, ...items];
      return {
        ...state,
        providersFilters: action.data.filters && action.data.filters.all_providers,
        categoryFilters: action.data.filters && action.data.filters.category,
        types: action.data.menus,
        itemsList: list,
        meta: action.data.meta,
        isLoadingCasinoList: false,
      };
    case GET_CASINO_FAILURE:
      return {
        ...state,
        isLoadingCasinoList: false,
      };
    case GET_CASINO_INIT_GAME_SESSION_REQUEST:
      return {
        ...state,
        isLoadingCasinoGame: true,
      };
    case GET_CASINO_INIT_GAME_SESSION_SUCCESS:
      return {
        ...state,
        isLoadingCasinoGame: false,
        gameSessionUrl: action.data.url,
        gameSessionError: action.data.errors,
      };
    case GET_CASINO_INIT_GAME_SESSION_FAILURE:
      return {
        ...state,
        isLoadingCasinoGame: false,
      };
    case ON_TAB_SELECT:
      return {
        ...state,
        typeSelected: action.tab,
      };
    case ON_FREE_SPIN_SELECT:
      return {
        ...state,
        freeSpinSelected: state.freeSpinSelected ?  '': true,
      };
    case ON_LOBBY_SELECT:
      return {
        ...state,
        lobbySelected: state.lobbySelected ? '' : true,
      };
    case ON_MOBILE_SELECT:
      return {
        ...state,
        mobileSelected: state.mobileSelected ? '' : true,
      };
    case SET_PROVIDERS_SELECT:
      console.log('setr procvider select', action.providersList);
      return {
        ...state,
        providersSelected: action.providersList,
      };
    default:
      return state;
  }
}

export default casino;
