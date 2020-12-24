import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl, View, StyleSheet } from 'react-native';
import CasinoCell from './CasinoCell';
import { formateData } from '../../../utils/utils';
import BackgrounMessage from '../../../components/BackgroundMessage';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
});

const CasinoList = (props) => {
  const columns = props.isPortrait ? 3 : 4;
  const { itemsList, isLoadingCasinoList } = props;
  return (
    <View style={styles.conatiner}>
      {itemsList.length !== 0 ? <FlatList
        key={(props.isPortrait ? 'v' : 'h')}
        keyExtractor={(item, index) => index.toString()}
        extraData={props}
        data={formateData(itemsList, columns)}
        numColumns={columns}
        onEndReached={() => props.handleLoadMore()}
        onEndThreshold={0.1}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={props.refreshCasinoList}
          />
        }
        renderItem={item => (
          <CasinoCell
            isPortrait={props.isPortrait}
            item={item.item}
            gameRedirectAction={uuid => props.gameRedirectAction(uuid)}
          />
      )}
      /> :
      !isLoadingCasinoList &&
      <BackgrounMessage title={commonLocalizeStrings.noResultFound} />}
    </View>
  );
};

CasinoList.propTypes = {
  itemsList: PropTypes.array,
  isLoadingCasinoList: PropTypes.bool,
  gameRedirectAction: PropTypes.func,
  handleLoadMore: PropTypes.func,
  isPortrait: PropTypes.bool,
  refreshCasinoList: PropTypes.func,
};

CasinoList.defaultProps = {
  itemsList: [],
  isLoadingCasinoList: false,
  gameRedirectAction: () => {},
  handleLoadMore: () => {},
  isPortrait: true,
  refreshCasinoList: () => {},
};

export default CasinoList;
