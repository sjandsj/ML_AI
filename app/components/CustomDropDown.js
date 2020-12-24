import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import { images } from '../assets/images';
import { UIColors, fontName, fontSizes, itemSizes, spacing } from '../utils/variables';

const max_height = 300;
const opacity = 0.5;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    zIndex: 10,
    backgroundColor: UIColors.defaultShadowColor,
    position: 'absolute',
    left: spacing.zero,
    right: spacing.zero,
    top: spacing.zero,
    bottom: spacing.zero,
    justifyContent: 'center',
  },
  topView: {
    flexDirection: 'row',
    padding: spacing.small,
    backgroundColor: UIColors.transparentColor,
    borderBottomWidth: 1,
    borderBottomColor: UIColors.tableHeader,
  },
  categoryInfoView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectCategoryText: {
    color: UIColors.primaryText,
    fontSize: fontSizes.medium,
    width: '100%',
    textAlign: 'center',
    fontFamily: fontName.SourceSansProRegular,
  },
  closeTouchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.small,
  },
  closeText: {
    color: UIColors.danger,
    fontSize: fontSizes.extraSmall,
    textAlign: 'center',
    fontFamily: fontName.SourceSansProSemiBold,
  },
  listStyle: {
    alignSelf: 'stretch',
    maxHeight: max_height,
  },
  rowStyle: {
    flexDirection: 'row',
    padding: spacing.small,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: UIColors.transparentColor,
  },
  rowText: {
    flex: 1,
    color: UIColors.primaryText,
    textAlign: 'left',
    paddingLeft: spacing.small,
    fontSize: fontSizes.extraSmall,
    fontFamily: fontName.SourceSansProSemiBold,
  },
  favoriteImage: {
    width: itemSizes.iconSmall,
    height: itemSizes.iconSmall,
    marginHorizontal: spacing.extraSmall,
  },
  headerView: {
    backgroundColor: UIColors.secondary,
    margin: spacing.small,
    maxHeight: max_height,
  },
  footerView: {
    height: itemSizes.defaultButtonHeight,
    marginHorizontal: spacing.large,
    marginVertical: spacing.extraSmall,
  },
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CustomDropDown = props => (
  <SafeAreaView style={[styles.Container,
    !props.fromQuestion
    && styles.centerView]}
  >
    <View style={styles.headerView}>
      <View style={styles.topView}>
        <View style={styles.categoryInfoView}>
          <Text
            style={styles.selectCategoryText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {props.title}
          </Text>
        </View>
      </View>
      <FlatList
        style={styles.listStyle}
        data={props.listData}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={opacity}
            onPress={() => props.onSelectOption(item)}
          >
            <View style={styles.rowStyle}>
              {props.fromQuestion
              && (
                <Image
                  source={images.securityQuestion}
                  style={styles.favoriteImage}
                />
              )
            }
              <Text
                style={[styles.rowText,
              (props.fromQuestion ?
                (props.selectedQuestion && props.selectedQuestion.question === item.question)
                : (props.selectedQuestion && props.selectedQuestion === item.name))
                ? { color: UIColors.focused } : { color: UIColors.primaryText }]}
                numberOfLines={3}
                lineBreakMode="tail"
              >{props.fromQuestion ? item.question : item.name}
              </Text>
              {props.fromQuestion
                ? <Image
                  source={(props.selectedQuestion
                    && props.selectedQuestion.question === item.question)
                    ? images.popupChecked : images.popupUnchecked}
                  style={styles.favoriteImage}
                  resizeMode="contain"
                /> :
                <Image
                  source={(props.selectedQuestion
                  && props.selectedQuestion === item.name)
                  ? images.popupChecked : images.popupUnchecked}
                  style={styles.favoriteImage}
                  resizeMode="contain"
                />
              }
            </View>
          </TouchableOpacity>
      )}
      />
      <View style={styles.footerView}>
        <TouchableOpacity
          onPress={() => props.close()}
          style={styles.closeTouchable}
        >
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
);

CustomDropDown.propTypes = {
  title: PropTypes.string,
  listData: PropTypes.arrayOf(PropTypes.any),
  onSelectOption: PropTypes.func,
  canShowFavorites: PropTypes.bool,
  toggleFavoriteState: PropTypes.func,
  close: PropTypes.func,
  isLoading: PropTypes.bool,
  loadMore: PropTypes.func,
  fromQuestion: PropTypes.bool,
  screenOrientation: PropTypes.objectOf(PropTypes.any),
  selectedQuestion: PropTypes.objectOf(PropTypes.any),
};

CustomDropDown.defaultProps = {
  title: '',
  listData: [],
  onSelectOption: () => { },
  canShowFavorites: false,
  toggleFavoriteState: () => { },
  close: () => { },
  isLoading: false,
  loadMore: () => { },
  fromQuestion: false,
  screenOrientation: '',
  selectedQuestion: {},
};

export default CustomDropDown;
