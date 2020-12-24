import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import colors from '../theme/colors';
import { UIColors } from '../utils/variables';

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  tabTextStyle: {
    textAlign: 'center',
    color: UIColors.newAppButtonGreenBackgroundColor,
    fontSize: 16,
    fontWeight: '600',
  },
});

const tabsList = ['Single', 'Combo'];

const Tab = props => (
  <View>
    <TouchableOpacity
      style={styles.tab}
      onPress={() => props.onPress(props.title, props.index)}
    >
      <Text style={styles.tabTextStyle}>{props.title}</Text>
    </TouchableOpacity>
    {props.selectedTab
      && <View style={{ height: 2, flex: 2, backgroundColor: UIColors.newAppButtonGreenBackgroundColor }} />}
  </View>
);

Tab.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  index: PropTypes.number,
  selectedTab: PropTypes.number,
};

Tab.defaultProps = {
  onPress: () => {},
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
    const tabs = tabsList.map((tab, index) => (
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
      <View style={{ height: 40, backgroundColor: UIColors.newAppBackgroundColorWhite }}>
        <ScrollView>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
            {tabs}
          </View>
        </ScrollView>
      </View>
    );
  }
}

TopTabBar.propTypes = {
  adsList: PropTypes.arrayOf(PropTypes.any),
  updateAdClickedEvent: PropTypes.func,
  onTabSelect: PropTypes.func,
};

TopTabBar.defaultProps = {
  adsList: [],
  updateAdClickedEvent: () => { },
  onTabSelect: () => {},
};

export default TopTabBar;
