import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import { FONT_14, responsiveFontSize } from '../../../utils/utils_functions';
import Loader from '../../../components/Loader';
import { UIColors } from '../../../utils/variables';
import { images } from '../../../assets/images';

const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColors.defaultWhite,
    borderRadius: 10,
  },
  subContainer: {
    borderRadius: 10,
  },
  textButton: {
    position: 'absolute',
    bottom: 0,
    height: responsiveFontSize(40),
    backgroundColor: 'rgba(0,0,0, 0.5)',
    width: responsiveFontSize(150),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    color: 'orange',
    alignSelf: 'center',
    bottom: 0,
    fontSize: FONT_14,
    fontWeight: '500',
  },
  imageField: {
    borderRadius: 10,
    height: responsiveFontSize(150),
    width: responsiveFontSize(150),
  },
});

const ImageViewContainer = (props) => {
  const imagePresent = !!props.profileImage;
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image
          onLoadStart={() => props.changeImageLoadingState(true)}
          onLoadEnd={() => props.changeImageLoadingState(false)}
          source={imagePresent ? { uri: props.profileImage } : images.uploadIcon}
          resizeMode={imagePresent ? 'stretch' : 'center'}
          style={styles.imageField}
        />
        <TouchableOpacity
          style={styles.textButton}
          onPress={() => props.isShowPopupDialog(props.imageToShow)}
        >
          <Text
            style={styles.text}
            numberOfLines={2}
          >
            {imagePresent ? `Change ${props.title}` : `Upload ${props.title}`}
          </Text>
        </TouchableOpacity>
      </View>
      {props.imageLoading && <Loader isAnimating={props.imageLoading} />}
    </View>
  );
};


ImageViewContainer.propTypes = {
  title: PropTypes.string,
  imageLoading: PropTypes.bool,
  imageToShow: PropTypes.string,
  isShowPopupDialog: PropTypes.func,
  changeImageLoadingState: PropTypes.func,
  profileImage: PropTypes.string,
};

ImageViewContainer.defaultProps = {
  title: 'photo',
  imageLoading: false,
  imageToShow: '',
  isShowPopupDialog: () => {},
  changeImageLoadingState: () => {},
  profileImage: '',
};

export default ImageViewContainer;
