import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, FlatList } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import UserActions from '../../../actions';
import { UIColors, itemSizes, spacing } from '../../../utils/variables';
import SportCell from './SportCell';

const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColors.secondary,
    padding: spacing.extraSmall,
  },
  innerView: {
    alignItems: 'center',
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const sportsList = [
  { id: 1, name: 'Soccer' },
];

class SportsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSport: _.first(sportsList),
    };
  }

  onCellPress(sport) {
    this.setState({ selectedSport: sport });
    this.props.onSelectSport(sport);
  }

  render() {
    return (
      <View style={[styles.container, {
        height: this.props.isPortrait ? itemSizes.headerSize : '100%',
        width: this.props.isPortrait ? '100%' : itemSizes.headerMediumSize,
      }]}
      >
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            horizontal={this.props.isPortrait}
            extraData={this.state}
            data={sportsList}
            renderItem={item => (
              <SportCell
                sport={item.item}
                onCellPress={sport => this.onCellPress(sport)}
                selectedSport={this.state.selectedSport}
              />
            )
            }
          />
        </View>
      </View>
    );
  }
}

SportsList.propTypes = {
  isPortrait: PropTypes.bool,
  mainGamePlay: PropTypes.object,
  isLoading: PropTypes.bool,
  onSelectSport: PropTypes.func,
};

SportsList.defaultProps = {
  isPortrait: true,
  mainGamePlay: { },
  isLoading: false,
  onSelectSport: () => { },
};

const mapStateToProps = state => ({
  mainGamePlay: state.mainGamePlay,
  isLoading: state.loaderReducers.isLoading,
});

const mapDispatchToProps = () => UserActions;
const SportsListScreen = connect(mapStateToProps, mapDispatchToProps)(SportsList);
export default SportsListScreen;
