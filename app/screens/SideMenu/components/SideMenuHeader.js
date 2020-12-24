import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import { UIColors, spacing, fontSizes, itemSizes, fontName } from '../../../utils/variables';
import { responsiveSize } from '../../../utils/utils';
import { images } from '../../../assets/images';
import { UserData } from '../../../utils/global';
import { toFixTwoDigitAfterDecimal, responsiveFontSize } from '../../../utils/utils_functions';

const viewProfile = responsiveSize(70);

const styles = StyleSheet.create({
  viewProfileContainer: {
    height: viewProfile,
    backgroundColor: UIColors.blueBorder,
    justifyContent: 'center',
    borderWidth: 1,
    borderBottomColor: UIColors.newAppBackgroundColorWhite,
    paddingLeft: responsiveFontSize(25),
  },
  viewProfile: {
    width: itemSizes.avatarCircleLarge,
    height: itemSizes.avatarCircleLarge,
    borderRadius: itemSizes.avatarCircleLarge / 2,
    backgroundColor: UIColors.primaryText,
    borderWidth: spacing.border,
  },
  avatarStyle: {
    width: responsiveSize(90),
    height: responsiveSize(70),
    resizeMode: 'contain',
    marginLeft: responsiveSize(15),
  },
  defaultWhiteLabel: {
    fontSize: fontSizes.extraSmall,
    color: UIColors.newAppYellowColor,
  },
  userNameText: {
    fontSize: fontSizes.medium,
    fontFamily: fontName.sourceSansProBold,
  },
  walletText: {
    fontSize: fontSizes.small,
    fontFamily: fontName.sourceSansProRegular,
    bottom: 0,
    left: 0,
    right: 0,
    color: UIColors.primaryText,
  },
  textView: {
    marginRight: spacing.extraExtraLarge,
    justifyContent: 'center',
  },
  balanceView: {
    height: 25,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginLeft: responsiveSize(15),
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(10),
  },
  editIcon: {
    tintColor: UIColors.defaultWhite,
    height: itemSizes.iconMedium,
    width: itemSizes.iconMedium,
  },
  refreshIcon: {
    tintColor: UIColors.defaultWhite,
    height: itemSizes.iconSmall,
    width: itemSizes.iconSmall,
  },
});

const SideMenuHeader = (props) => {
  return (
    <View style={styles.viewProfileContainer}>
      { UserData.BearerToken
      ?
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => props.openProfileScreen()}
          >
            <Image
              source={images.editProfileIcon}
              style={styles.editIcon}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <View style={styles.textView}>
            <Text
              numberOfLines={3}
              style={[styles.defaultWhiteLabel, styles.userNameText]}
            >
              {props.userName}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.walletText}>
                {`Wallat Balance: ${toFixTwoDigitAfterDecimal(props.balance)}`}
              </Text>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => props.refreshProfile()}
              >
                <Image
                  source={images.refreshIcon}
                  style={styles.refreshIcon}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :
        <Image
          source={images.applicationLogo}
          style={styles.avatarStyle}
        />
      }
    </View>
  );
};

SideMenuHeader.propTypes = {
  openProfileScreen: PropTypes.func,
  profileImage: PropTypes.string,
  userName: PropTypes.string,
  balance: PropTypes.number,
  refreshProfile: PropTypes.func,
};

SideMenuHeader.defaultProps = {
  openProfileScreen: () => {},
  profileImage: '',
  userName: '',
  balance: null,
  refreshProfile: () => {},
};

export default SideMenuHeader;
