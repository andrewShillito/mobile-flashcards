import React from "react";
import { Modal, View, Text, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import SubmitBtn from "./SubmitBtn";

class EditCardModal extends React.Component {
  render() {
    const { activeCard, activeDeck, isModalVisible, toggleModal, cardIndex } = this.props;

    return (
      <Modal
        visible={isModalVisible}
        onRequestClose={() => {
          toggleModal(cardIndex); // cardIndex is unecessary when closing modal but prevents changing function
        }}
        animationType="slide"
        transparent={true}
        >
        <View style={styles.container}>
          <View style={styles.modalContent}>
            <Text>Modal Text</Text>
            <Text>{activeCard.question}</Text>
            <Text>{activeCard.answer}</Text>

            <SubmitBtn type="textDeleteButton" onPress={() => toggleModal(cardIndex)}>Go Back</SubmitBtn>
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

function mapStateToProps({ activeDeck, decks }, { isModalVisible, toggleModal, cardIndex }){
  return {
    isModalVisible,
    toggleModal,
    activeDeck,
    activeCard: decks[activeDeck].questions[cardIndex],
    cardIndex,
  };
}

export default connect(mapStateToProps)(EditCardModal);
