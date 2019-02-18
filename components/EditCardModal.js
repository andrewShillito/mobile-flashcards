import React from "react";
import { Modal, View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import SubmitBtn from "./SubmitBtn";
import { handleEditCard, handleRemoveCard } from "../actions/cards";

class EditCardModal extends React.Component {
  state = {
    question: "",
    answer: "",
    message: "Same as current card",
    messageColor: "#dc3545",
    duplicateCardMessage: "Card already exists in deck",
    sameAsCurrentCardMessage: "Same as current card",
    emptyInputMessage: "Complete both fields or go back to cancel",
    successMessage: "Ready for submission",
    inputTooLongMessage: "Max input length exceeded",
    warningColor: "#dc3545",
    successColor: "#28a745",
    maxInputLength: 120,
  }
  componentDidUpdate(prevProps) {
    if (prevProps.activeCard === null) {
      this.setState(() => ({
        question: this.props.activeCard ? this.props.activeCard.question : "",
        answer: this.props.activeCard ? this.props.activeCard.answer : "",
      }), () => {
        this.validateInput;
      });
    }
  }
  validateInput = () => {
    const { questions, activeCard, cardIndex } = this.props;

    if (activeCard === undefined) {
      return false;
    }

    if (this.state.question.length && this.state.answer.length) {
      if (activeCard.question === this.state.question && activeCard.answer === this.state.answer) {
        this.setMessage(this.state.sameAsCurrentCardMessage, this.state.warningColor);
        return false;
      } else if (questions.some((card) => card.question === this.state.question && card.answer === this.state.answer)) {
        this.setMessage(this.state.duplicateCardMessage, this.state.warningColor);
        return false;
      } else if (this.state.question.length > this.state.maxInputLength || this.state.answer.length> this.state.maxInputLength) {
        this.setMessage(this.state.inputTooLongMessage, this.state.warningColor);
        return false;
      }
      this.setMessage(this.state.successMessage, this.state.successColor);
      return true;
    }
    this.setMessage(this.state.emptyInputMessage, this.state.warningColor);
    return false;
  }
  onChange = ({value, name}) => {
    this.setState(() => ({
      [name]: value,
    }), this.validateInput);
  }
  setMessage = (message, messageColor) => {
    this.setState(() => ({
      message,
      messageColor,
    }));
  }
  onSubmit = () => {
    if (this.validateInput()) {
      const newCard = {
        question: this.state.question,
        answer: this.state.answer,
      };
      this.props.toggleModal();
      this.props.dispatch(handleEditCard(this.props.activeDeck, this.props.cardIndex, newCard));
      this.setState(() => ({
        question: "",
        answer: "",
      }));
    }
    alert(this.state.message);
  }
  deleteCard = () => {
    this.props.toggleModal();
    this.props.dispatch(handleRemoveCard(this.props.activeDeck, this.props.cardIndex));
    this.setState(() => ({
      question: "",
      answer: "",
    }));
  }
  render() {
    const { activeCard, activeDeck, isModalVisible, toggleModal, cardIndex } = this.props;
    const { message, messageColor } = this.state;

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
            <Text style={styles.header}>{`${cardIndex+1}. ${activeCard ? activeCard.question : ""}`}</Text>
            <Text style={styles.label}>Edit Question</Text>
            <View style={inputStyles.inputContainer}>
              <TextInput
                style={inputStyles.input}
                placeholder="Question"
                onChangeText={(question) => this.onChange({ value: question, name: "question" })}
                value={this.state.question}
                />
            </View>
            <Text style={styles.label}>Edit Answer</Text>
            <View style={inputStyles.inputContainer}>
              <TextInput
                style={inputStyles.input}
                placeholder="Answer"
                onChangeText={(answer) => this.onChange({ value: answer, name: "answer" })}
                value={this.state.answer}
                />
            </View>
            <View>
              <SubmitBtn onPress={this.onSubmit}>Submit Changes</SubmitBtn>
              <View style={{alignItems: "center"}}>
                <Text style={{color: messageColor}}>{message}</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => toggleModal(cardIndex)} style={styles.textButton}>
                <Text style={styles.textButtonText}>Go Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.deleteCard} style={styles.textButton}>
                <Text style={styles.deleteButtonText}>Delete Card</Text>
              </TouchableOpacity>
            </View>
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
    justifyContent: "space-between"
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    margin: 10,
    width: (Dimensions.get("window").width)*.70,
    alignSelf: "center"
  },
  text: {
    fontSize: 20,
  },
  label: {
    fontSize: 20,
    fontStyle: "italic",
    marginLeft: 5,
  },
  header: {
    fontSize: 25,
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-end",
    width: (Dimensions.get("window").width)*.90,
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  textButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  textButtonText: {
    fontSize: 20,
    color: "steelblue",
  },
  deleteButtonText: {
    fontSize: 20,
    color: "#dc3545",
  }
});

const inputStyles = StyleSheet.create({
  input: {
    marginHorizontal: 5,
    fontSize: 20,
    paddingBottom: 5,
  },
  inputContainer: {
    borderStyle: "solid",
    borderColor: "white",
    borderBottomColor: "black",
    borderWidth: 1,
    width: 270,
    alignSelf: "center"
  },
})


function mapStateToProps({ activeDeck, decks, activeCard }, { toggleModal }){
  return {
    isModalVisible: activeCard === null ? false : true,
    toggleModal,
    activeDeck,
    activeCard,
    cardIndex: activeCard ? activeCard.index : null,
    questions: decks[activeDeck].questions,
  };
}

export default connect(mapStateToProps)(EditCardModal);
