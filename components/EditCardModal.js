import React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { handleEditCard, handleRemoveCard } from "../actions/cards";
import { clearActiveCard } from "../actions/activeCard";
// the handleEditCard and handleRemoveCard funcs dispatch clearActiveCard when done updating redux
// however, the goBack button needs to clear the active card as well so it is imported here for that use
import FormGroupSecondary from "./FormGroupSecondary";
import ModalWrapperPrimary from "./ModalWrapperPrimary";
import ButtonBarBottomPrimary from "./ButtonBarBottomPrimary";
import styles from "../styles/editCardModal";

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
      <ModalWrapperPrimary
        visible={isModalVisible}
        onRequestClose={toggleModal}
        onPressOutside={() => {
          this.props.closeModal();
          this.props.dispatch(clearActiveCard());
        }}
        >
        <Text style={styles.header}>
          {`${cardIndex+1}. ${activeCard !== null ? activeCard.question : ""}`}
        </Text>
        <FormGroupSecondary
          inputProps={inputProps}
          buttonProps={buttonProps}
          textProps={textProps}
          />
        <ButtonBarBottomPrimary
          leftText="Go Back"
          onPressLeft={() => {
              toggleModal();
              this.props.dispatch(clearActiveCard());
            }}
          rightText="Delete Card"
          onPressRight={this.deleteCard}
          />
      </ModalWrapperPrimary>
    );
  }
}

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
