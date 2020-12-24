import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';
import { UIColors, spacing, itemSizes } from '../../../utils/variables';
import LimitRow from './LimitRow';
import { limits } from '../../../utils/enum';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.secondary,
    // justifyContent: 'flex-start',
  },
});

const CreateUserLimit = props => (
  <View style={styles.container} >
    <LimitRow
      data={props.data && props.data[2]}
      userLimit={props.timeoutLimit && props.timeoutLimit.range}
      onPressUserLimit={() => {
        const requestedDate = props.timeoutLimit && props.timeoutLimit.requested_at;
        props.onPressLimit(limits.REMINDER, requestedDate);
      }}
      isSelected={props.selectedLimitType === limits.REMINDER}
    />
  </View>
);

CreateUserLimit.propTypes = {
  data: PropTypes.array,
  depositLimit: PropTypes.object,
  onPressLimit: PropTypes.func,
  selectedLimitType: PropTypes.string,
  emptyPassword: PropTypes.bool,
  betLimit: PropTypes.object,
  timeoutLimit: PropTypes.object,
};

CreateUserLimit.defaultProps = {
  data: [],
  depositLimit: {},
  onPressLimit: () => { },
  selectedLimitType: '',
  emptyPassword: false,
  betLimit: {},
  timeoutLimit: {},
};

export default CreateUserLimit;
