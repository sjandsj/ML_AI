import { Dimensions } from 'react-native';

const sizeDenominator = 850;

export function windowSize() {
  return Dimensions.get('window');
}

export function responsiveSize(fontSize) {
  const { width, height } = windowSize();
  return (Math.sqrt((height * height) + (width * width)) * (fontSize / sizeDenominator));
}
