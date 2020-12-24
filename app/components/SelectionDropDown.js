import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { images } from '../assets/images';
import FONT_16, { FONT_18 } from '../utils/utils_functions';
import { UIColors } from '../utils/variables';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,1)',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: 150,

  },
  touchableContianer: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    width: width * 0.80,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  topView: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 8,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  categoryInfoView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectCategoryText: {
    // color: 'white',
    color: UIColors.newAppFontBlackColor,
    fontSize: FONT_18,
    marginVertical: 5,
    marginLeft: 10,
    width: '100%',
    textAlign: 'center',
  },
  closeView: {
    position: 'absolute',
    right: 0,
    top: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeTouchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  closeText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
  },

  listContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  listStyle: {
    alignSelf: 'stretch',
    maxHeight: height * 0.70,
  },
  rowStyle: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  rowText: {
    flex: 1,
    // color: 'white',
    color: UIColors.newAppFontBlackColor,
    textAlign: 'left',
    paddingLeft: 10,
    fontSize: FONT_16,
  },
  favoriteView: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
  },
  favoriteImage: {
    width: 18,
    height: 18,
    marginHorizontal: 5,
  },
});

const SelectionDropDown = props => (
  <View style={[styles.Container, !props.fromQuestion && { justifyContent: 'center', alignItems: 'center' }]}>
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      style={styles.listStyle}
      data={props.listData}
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.onSelectOption(item)}
        >
          <View style={[styles.rowStyle, { paddingVertical: props.canShowFavorites ? 5 : 10 }]}>
            {props.fromQuestion
              && (
                <Image
                  source={images.securityQuestion}
                  style={{ width: 18, height: 18, paddingRight: 5 }}
                />
              )
            }
            <Text
              style={[styles.rowText,
              (props.fromQuestion ?
                (props.selectedQuestion && props.selectedQuestion.question === item.question)
                : (props.selectedQuestion && props.selectedQuestion === item.name))
                ? { color: UIColors.newAppYellowColor } : { color: UIColors.newAppFontBlackColor }]}
              numberOfLines={3}
              lineBreakMode="tail"
            >{props.fromQuestion ? item.question : item.name}
            </Text>
            {props.fromQuestion
              ? (
                <Image
                  source={(
                    props.selectedQuestion
                    && props.selectedQuestion.question === item.question
                  )
                    ? images.popupChecked
                    : images.popupUnchecked
                  }
                  style={styles.favoriteImage}
                  resizeMode="contain"
                />
              )
              : (
                <Image
                  source={(
                    props.selectedQuestion
                    && props.selectedQuestion === item.name
                  )
                    ? images.popupChecked
                    : images.popupUnchecked
                  }
                  style={styles.favoriteImage}
                  resizeMode="contain"
                />
              )
            }
          </View>
        </TouchableOpacity>
      )}
    />
  </View>

);

SelectionDropDown.propTypes = {
  title: PropTypes.string,
  listData: PropTypes.arrayOf(PropTypes.any),
  onSelectOption: PropTypes.func,
  canShowFavorites: PropTypes.bool,
  toggleFavoriteState: PropTypes.func,
  close: PropTypes.func,
  isLoading: PropTypes.bool,
  loadMore: PropTypes.func,
  fromQuestion: PropTypes.bool,
  selectedQuestion: PropTypes.string,
};

SelectionDropDown.defaultProps = {
  title: 'Please select an option',
  listData: [],
  onSelectOption: () => { },
  canShowFavorites: false,
  toggleFavoriteState: () => { },
  close: () => { },
  isLoading: false,
  loadMore: () => { },
  fromQuestion: false,
  selectedQuestion: '',
};

export default SelectionDropDown;
