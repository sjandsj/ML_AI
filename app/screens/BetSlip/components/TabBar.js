import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { UIColors, spacing, fontName, fontSizes, itemSizes } from '../../../utils/variables';

const styles = StyleSheet.create({
  tab: {
    height: itemSizes.itemWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: fontSizes.extraSmall,
    fontWeight: '600',
    fontFamily: fontName.sourceSansProBold,
  },
  tabContainer: {
    // paddingEnd: spacing.medium,
    justifyContent: 'center',
    flex: 1,
  },
  borderSelcter: {
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    height: spacing.extraExtraSmall,
    width: '100%',
  },
});

const Tab = props => (
  <View style={styles.tabContainer}>
    <TouchableOpacity
      style={styles.tab}
      onPress={() => props.onPress(props.title, props.index)}
    >
      <Text style={[styles.tabTextStyle]}>{props.title}</Text>
    </TouchableOpacity>
    {props.selectedTab
      ? <View style={styles.borderSelcter} />
      : <View style={{ height: spacing.extraExtraSmall, backgroundColor: 'gray' }} />}
  </View>
);

Tab.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  index: PropTypes.number,
  selectedTab: PropTypes.number,
};

Tab.defaultProps = {
  onPress: () => { },
  title: '',
  index: 0,
  selectedTab: 0,
};

class TopTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
    };
  }

  onPressTab = (item, index) => {
    this.setState({
      selectedTab: index,
    });
  }

  render() {
    const tabs = this.props.tabsList.map((tab, index) => (
      <Tab
        title={tab}
        selectedTab={this.state.selectedTab === index}
        onPress={() => {
          this.onPressTab(tab, index);
          this.props.onTabSelect(tab, index);
        }}
      />
    ));
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        {tabs}
      </View>
    );
  }
}

TopTabBar.propTypes = {
  tabsList: PropTypes.array,
  updateAdClickedEvent: PropTypes.func,
  onTabSelect: PropTypes.func,
  fontName: PropTypes.string,
};

TopTabBar.defaultProps = {
  tabsList: [],
  updateAdClickedEvent: () => { },
  onTabSelect: () => { },
  fontName: fontName.sourceSansProBold,
};

export default TopTabBar;
