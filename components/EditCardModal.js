import React from "react";
import { Modal, View, Text } from "react-native";
import { connect } from "react-redux";

class EditCardModal extends React.Component {
  state = {
    isModalVisible: this.props.isModalVisible,
  }
  render() {
    return (
      <Modal>
        <View>
          <Text>Modal Text</Text>
        </View>
      </Modal>
    );
  }
}

function mapStateToProps({ }, { isModalVisible }){
  return {
    isModalVisible,
  };
}

export default connect(mapStateToProps)(EditCardModal);
