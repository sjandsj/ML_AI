import {
  Dimensions,
} from 'react-native';
import { responsiveSize } from './utils';

const { width, height } = Dimensions.get('window');

export const UIColors = {
  navigationBar: 'orange',
  navigationTitle: 'white',
  appBackGroundColor: 'white',
  primaryButton: '#4f5863',
  textTitle: 'black',
  textDetail: '#434343',
  loderBackgroundColor: '#00000060',
  blueColor: 'blue',
};

export const fontSizes = {
  mini: responsiveSize(8),
  tiny: responsiveSize(10),
  extraExtraSmall: responsiveSize(12),
  extraSmall: responsiveSize(14),
  small: responsiveSize(16),
  medium: responsiveSize(18),
  mediumLarge: responsiveSize(20),
  large: responsiveSize(22),
  extraLarge: responsiveSize(24),
  extraLarger: responsiveSize(28),
  extraExtraLarge: responsiveSize(32),
  giant: responsiveSize(36),
  iosIcons: responsiveSize(32),
  androidCloseIcon: responsiveSize(22),
  androidCheckmarkIcon: responsiveSize(26),
};

export const spacing = {
  zero: responsiveSize(0),
  border: responsiveSize(1),
  borderDouble: responsiveSize(2),
  extraExtraSmall: responsiveSize(3),
  extraSmall: responsiveSize(5),
  small: responsiveSize(8),
  semiMedium: responsiveSize(10),
  medium: responsiveSize(12),
  mediumLarge: responsiveSize(16),
  large: responsiveSize(20),
  extraLarge: responsiveSize(24),
  extraExtraLarge: responsiveSize(30),
};

export const itemSizes = {
  defaultHeight: responsiveSize(50),
  defaultWidth: responsiveSize(50),
  navLogoImageWidth: responsiveSize(150),
  navLogoImageHeight: responsiveSize(50),
  backIconWidth: responsiveSize(30),
  headlineImageInDetail: responsiveSize(width - 20),
  defaultIosTextInputHeight: responsiveSize(36),
};

export const fontWeights = {
  thin: '100',
  light: '300',
  book: '400',
  medium: '500',
  bold: '700',
  black: '900',
};

export const fontNames = {
  sourceSansProBlack: 'SourceSansPro-Black',
  sourceSansProBlackItalic: 'SourceSansPro-BlackItalic',
  sourceSansProBold: 'SourceSansPro-Bold',
  sourceSansProBoldItalic: 'SourceSansPro-BoldItalic',
  sourceSansProExtraLight: 'SourceSansPro-ExtraLight',
  sourceSansProExtraLightItalic: 'SourceSansPro-ExtraLightItalic',
  sourceSansProItalic: 'SourceSansPro-Italic',
  sourceSansProLight: 'SourceSansPro-Light',
  sourceSansProLightItalic: 'SourceSansPro-LightItalic',
  sourceSansProRegular: 'SourceSansPro-Regular',
  sourceSansProSemiBold: 'SourceSansPro-SemiBold',
  sourceSansProSemiBoldItalic: 'SourceSansPro-SemiBoldItalic',
};