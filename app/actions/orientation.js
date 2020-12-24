export const SET_CURRENT_ORIENTATION = 'SET_CURRENT_ORIENTATION';

export const setCurrentOrientation = (isPortrait, screenOrientation, screenHeight, screenWidth) => (
  {
    type: SET_CURRENT_ORIENTATION,
    isPortrait,
    screenOrientation,
    screenHeight,
    screenWidth,
  }
);

