import React from "react";
import { Modal, View, Text } from "react-native";
import { connect } from "react-redux";

class EditCardModal extends React.Component {
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

function mapStateToProps(){
  return {

  };
}

export default connect(mapStateToProps)(EditCardModal);
