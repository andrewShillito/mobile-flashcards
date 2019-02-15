import React from "react";
import { Modal, View, Text, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import SubmitBtn from "./SubmitBtn";

class EditCardModal extends React.Component {
  render() {
    return (
      <Modal
        visible={this.props.isModalVisible}
        onRequestClose={() => {
          this.props.toggleModal();
        }}
        animationType="slide"
        transparent={true}
        >
        <View style={styles.container}>
          <View style={styles.modalContent}>
            <Text>Modal Text</Text>
            <SubmitBtn type="textDeleteButton" onPress={this.props.toggleModal}>Go Back</SubmitBtn>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    alignItems: "center",
    height: (Dimensions.get("window").height)*.75,
    width: (Dimensions.get("window").width)*.90,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

function mapStateToProps({ }, { isModalVisible, toggleModal }){
  return {
    isModalVisible,
    toggleModal
  };
}

export default connect(mapStateToProps)(EditCardModal);
