import _ from 'lodash';
import {
  GET_VIRTUAL_GAMES_REQUEST,
  GET_VIRTUAL_GAMES_SUCCESS,
  GET_VIRTUAL_GAMES_FAILURE,
  GET_VIRTUAL_GAMES_INIT_GAME_SESSION_REQUEST,
  GET_VIRTUAL_GAMES_INIT_GAME_SESSION_FAILURE,
  GET_VIRTUAL_GAMES_INIT_GAME_SESSION_SUCCESS,
  ON_VIRTUAL_GAMES_TAB_SELECT,
  ON_VIRTUAL_GAMES_FREE_SPIN_SELECT,
  ON_VIRTUAL_GAMES_LOBBY_SELECT,
  ON_VIRTUAL_GAMES_MOBILE_SELECT,
  SET_VIRTUAL_GAMES_PROVIDERS_SELECT,
} from '../actions/virtualGamesAction';

const initialState = {
  itemsList: [],
  types: [],
  metaData: [],
  currentVirtualGamesList: [],
  gameSessionUrl: '',
  gameSessionError: '',
  isLoadingVirtualGamesList: false,
  isLoadingVirtualGamesGame: false,
  typeSelected: {},
  freeSpinSelected: '',
  lobbySelected: '',
  mobileSelected: '',
  providersSelected: [],
  providersFilters: {},
  categoryFilters: [],
};

function virtualGamesReducer(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case GET_VIRTUAL_GAMES_REQUEST:
      return {
        ...state,
        isLoadingVirtualGamesList: true,
      };
      // eslint-disable-next-line no-case-declarations
    case GET_VIRTUAL_GAMES_SUCCESS:
      const { meta, items } = action.data;
      const list = meta.current_page === 1 ? items : [...state.itemsList, ...items];
      return {
        ...state,
        providersFilters: action.data.filters && action.data.filters.all_providers,
        categoryFilters: action.data.filters && action.data.filters.category,
        types: action.data.menus,
        itemsList: list,
        meta: action.data.meta,
        isLoadingVirtualGamesList: false,
      };
    case GET_VIRTUAL_GAMES_FAILURE:
      return {
        ...state,
        isLoadingVirtualGamesList: false,
      };
    case GET_VIRTUAL_GAMES_INIT_GAME_SESSION_REQUEST:
      return {
        ...state,
        isLoadingVirtualGamesGame: true,
      };
    case GET_VIRTUAL_GAMES_INIT_GAME_SESSION_SUCCESS:
      return {
        ...state,
        isLoadingVirtualGamesGame: false,
        gameSessionUrl: action.data.url,
        gameSessionError: action.data.errors,
      };
    case GET_VIRTUAL_GAMES_INIT_GAME_SESSION_FAILURE:
      return {
        ...state,
        isLoadingVirtualGamesGame: false,
      };
    case ON_VIRTUAL_GAMES_TAB_SELECT:
      return {
        ...state,
        typeSelected: action.tab,
      };
    case ON_VIRTUAL_GAMES_FREE_SPIN_SELECT:
      return {
        ...state,
        freeSpinSelected: state.freeSpinSelected ?  '': true,
      };
    case ON_VIRTUAL_GAMES_LOBBY_SELECT:
      return {
        ...state,
        lobbySelected: state.lobbySelected ? '' : true,
      };
    case ON_VIRTUAL_GAMES_MOBILE_SELECT:
      return {
        ...state,
        mobileSelected: state.mobileSelected ? '' : true,
      };
    case SET_VIRTUAL_GAMES_PROVIDERS_SELECT:
      return {
        ...state,
        providersSelected: action.providersList,
      };
    default:
      return state;
  }
}

export default virtualGamesReducer;
