import { SET_CURRENT_ORIENTATION } from '../actions/orientation';

const initialState = {
  isPortrait: '',
  screenOrientation: '',
  screenHeight: '',
  screenWidth: '',
};

function getCurrentOrientation(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case SET_CURRENT_ORIENTATION:
      return {
        ...state,
        isPortrait: action.isPortrait,
        screenOrientation: action.screenOrientation,
        screenHeight: action.screenHeight,
        screenWidth: action.screenWidth,
      };

    default:
      return state;
  }
}

export default getCurrentOrientation;

