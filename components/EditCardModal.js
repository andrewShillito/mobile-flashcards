import React from "react";
import { Modal, View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { connect } from "react-redux";
import SubmitBtn from "./SubmitBtn";
import { handleEditCard, handleRemoveCard } from "../actions/cards";
import { clearActiveCard } from "../actions/activeCard";
// the handleEditCard and handleRemoveCard funcs dispatch clearActiveCard when done updating redux
// however, the goBack button needs to clear the active card as well so it is imported here for that use
import FormGroupSecondary from "./FormGroupSecondary";


class EditCardModal extends React.Component {
  state = {
    question: "",
    answer: "",
    message: "Complete both fields or go back to cancel",
    messageColor: "#28a745",
    duplicateCardMessage: "Card already exists in deck",
    sameAsCurrentCardMessage: "Same as current card",
    emptyInputMessage: "Complete both fields or go back to cancel",
    successMessage: "Ready for submission",
    inputTooLongMessage: "Max input length exceeded",
    warningColor: "#dc3545",
    successColor: "#28a745",
    maxInputLength: 120,
  }
  validateInput = () => {
    const { questions, activeCard, cardIndex } = this.props;

    if (activeCard === null) {
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
      this.props.closeModal();
      const newCard = {
        question: this.state.question,
        answer: this.state.answer,
      };
      this.props.dispatch(handleEditCard(this.props.activeDeck, this.props.cardIndex, newCard));
      this.setState(() => ({
        question: "",
        answer: "",
      }));
    }
    else {
      alert(this.state.message);
    }
  }
  deleteCard = () => {
    this.props.closeModal();
    this.props.dispatch(handleRemoveCard(this.props.activeDeck, this.props.cardIndex));
    this.setState(() => ({
      question: "",
      answer: "",
    }));
  }
  render() {
    const { activeCard, activeDeck, isModalVisible, toggleModal, cardIndex } = this.props;
    const { message, messageColor } = this.state;
    const inputProps = [
      {
        placeholder: this.props.activeCard ? this.props.activeCard.question : "Question",
        onChangeText: (question) => this.onChange({ value: question, name: "question" }),
        value: this.state.question,
        label: "Edit Question",
      },
      {
        placeholder: this.props.activeCard ? this.props.activeCard.answer : "Answer",
        onChangeText: (answer) => this.onChange({ value: answer, name: "answer" }),
        value: this.state.answer,
        label: "Edit Answer",
      },
    ];
    const textProps = {
        color: messageColor,
        message,
    };
    const buttonProps = {
      onPress: this.onSubmit,
      text: "Submit Changes",
    };

    return (
      <Modal
        visible={isModalVisible}
        onRequestClose={() => toggleModal()}
        animationType="slide"
        transparent={true}
        >
        <TouchableWithoutFeedback onPress={() => {
            this.props.closeModal();
            this.props.dispatch(clearActiveCard());
          }}>
          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <Text style={styles.header}>{`${cardIndex+1}. ${activeCard !== null ? activeCard.question : ""}`}</Text>
                <FormGroupSecondary
                  inputProps={inputProps}
                  buttonProps={buttonProps}
                  textProps={textProps}
                  />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => {
                      toggleModal();
                      this.props.dispatch(clearActiveCard());
                    }} style={styles.textButton}>
                    <Text style={styles.textButtonText}>Go Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.deleteCard} style={styles.textButton}>
                    <Text style={styles.deleteButtonText}>Delete Card</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "space-between",
    alignItems: "center",
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
});


function mapStateToProps({ activeDeck, decks, activeCard }, { toggleModal, isModalVisible, closeModal }){
  return {
    isModalVisible,
    toggleModal,
    closeModal,
    activeDeck,
    activeCard,
    cardIndex: activeCard !== null ? activeCard.index : null,
    questions: decks[activeDeck] ? decks[activeDeck].questions : [],
  };
}

export default connect(mapStateToProps)(EditCardModal);
