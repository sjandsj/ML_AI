import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ContextMenu from './ContextMenu';
import ContextMenuButton from './ContextMenuButton';
import { cameraPicker, galleryPicker } from './ImagePickerComponent';

class ChooseImagePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onPopupItemClick(index, imageId) {
    this.props.isShowPopupDialog(false);
    if (index === 0) {
      cameraPicker((
        (uri, multipartBody) => this.props.setAvaterSource(uri, multipartBody, imageId)), imageId);
    } else if (index === 1) {
      galleryPicker((
        (uri, multipartBody) => this.props.setAvaterSource(uri, multipartBody, imageId)), imageId);
    } else if (index === 2) {
      this.props.setAvaterSource('DeleteImage', '', imageId);
    }
  }

  render() {
    return (
      <ContextMenu
        cancelButtonAction={() => this.onPopupItemClick(-1, this.props.imageToShow)}
      >
        <ContextMenuButton
          text="Take Photo"
          action={() => this.onPopupItemClick(0, this.props.imageToShow)}
        />
        <ContextMenuButton
          text="Choose Photo"
          action={() => this.onPopupItemClick(1, this.props.imageToShow)}
        />
        { this.props.isHaveImage &&
          <View>
            <ContextMenuButton
              text="Delete Photo"
              altTextColor
              action={() => this.onPopupItemClick(2, this.props.imageToShow)}
            />
          </View>
        }
      </ContextMenu>
    );
  }
}

ChooseImagePopup.propTypes = {
  setAvaterSource: PropTypes.func,
  isShowPopupDialog: PropTypes.func,
  isHaveImage: PropTypes.bool,
  imageToShow: PropTypes.string,
};

ChooseImagePopup.defaultProps = {
  setAvaterSource: () => {},
  isShowPopupDialog: () => {},
  isHaveImage: false,
  imageToShow: '',
};

export default ChooseImagePopup;
