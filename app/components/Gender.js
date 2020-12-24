import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { images } from '../assets/images';
import colors from '../theme/colors';
import { UIColors } from '../utils/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  segment: {
    height: 30,
    width: 150,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderColor: colors.appBlackColor,
    borderColor: UIColors.newAppWhiteBorderColor,
    borderWidth: 2,
    borderRadius: 3,
  },
  segmentButton: {
    // backgroundColor: colors.appBlackColor,
    backgroundColor: UIColors.newAppBackgroundColorWhite,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  segmentButtonSelected: {
    backgroundColor: colors.appGreyColor,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  heading: {
    flexDirection: 'row',
  },
  title: {
    color: UIColors.newAppFontBlackColor,
    marginLeft: 10,
  },
  segmentTitle: {
    // color: 'white',
    color: UIColors.newAppFontBlackColor,
  },
  segmentTitleSelected: {
    // color: 'orange',
    color: UIColors.newAppButtonBlueColor,
  },
});

class Gender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex,
    };
  }

  render() {
    const firstIndexStyle = (
      this.state.selectedIndex === 0
        ? styles.segmentButtonSelected
        : styles.segmentButton
    );
    const secondIndexStyle = (
      this.state.selectedIndex === 1
        ? styles.segmentButtonSelected
        : styles.segmentButton
    );
    const firstSegmentTitleStyle = (
      this.state.selectedIndex === 0 ?
        styles.segmentTitleSelected
        : styles.segmentTitle
    );
    const secondSegmentTitleStyle = (
      this.state.selectedIndex === 1
        ? styles.segmentTitleSelected
        : styles.segmentTitle
    );
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Image source={images.userName} style={{ width: 18, height: 18 }} />
          <Text style={styles.title}>Gender</Text>
        </View>
        <View style={styles.segment}>
          <TouchableOpacity
            style={firstIndexStyle}
            onPress={() => {
							this.setState({ selectedIndex: 0 });
							this.props.onSelect(0);
						}}
          >
            <Text style={firstSegmentTitleStyle}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={secondIndexStyle}
            onPress={() => {
							this.setState({ selectedIndex: 1 });
							this.props.onSelect(1);
						}}
          >
            <Text style={secondSegmentTitleStyle}>Female</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Gender.propTypes = {
  onSelect: PropTypes.func,
  selectedIndex: PropTypes.number,
};

Gender.defaultProps = {
  selectedIndex: 0,
  onSelect: () => { },
};

export default Gender;
