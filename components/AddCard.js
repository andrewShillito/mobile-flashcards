import React from "react";
import { connect } from "react-redux";
import { handleAddCard } from "../actions/cards";
import FormGroupPrimary from "./FormGroupPrimary";
import { validateInputLength, validateUniqueCard } from "../utils/helpers";
import { RED, SUCCESS } from "../styles/shared";

class AddCard extends React.Component {
  state = {
    question: "",
    answer: "",
    message: "Submit to add a new card",
    messageColor: SUCCESS,
    duplicateCardMessage: "Card already exists",
    emptyInputMessage: "Must complete both fields",
    successMessage: "Ready for submission",
    warningColor: RED,
    successColor: SUCCESS,
  }
  onChange = ({value, name}) => {
    this.setState(() => ({
      [name]: value,
    }), this.validateInput);
  }
  validateInput = () => {
    const { questions } = this.props.deck;
    if (validateInputLength(this.state.question) && validateInputLength(this.state.answer)) {
      if (validateUniqueCard(this.state.question, this.state.answer, questions)) {
        this.setDuplicateCardMessage();
        return false;
      } else {
        this.setSuccessMessage();
        return true;
      }
    }
    this.setEmpyInputMessage();
    return false;
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
      this.props.dispatch(handleAddCard(this.props.deck.title, newCard));
      this.setState(() => ({
        question: "",
        answer: "",
      }))
    }
    else {
      alert(this.state.message);
    }
  }
  setDuplicateCardMessage = () => {
    this.setMessage(this.state.duplicateCardMessage, this.state.warningColor);
  }
  setEmpyInputMessage = () => {
    this.setMessage(this.state.emptyInputMessage, this.state.warningColor);
  }
  setSuccessMessage = () => {
    this.setMessage(this.state.successMessage, this.state.successColor);
  }
  render() {
    const message = this.state.message;
    const color = this.state.messageColor;
    const inputProps = [
      {
        placeholder: "Question",
        onChangeText: (question) => this.onChange({ value: question, name: "question"}),
        value: this.state.question,
      },
      {
        placeholder: "Answer",
        onChangeText: (answer) => this.onChange({ value: answer, name: "answer" }),
        value: this.state.answer,
      },
    ];
    const textProps = {
      message,
      color,
    };
    const buttonProps = {
      onPress: this.onSubmit,
      text: "Add Card",
    };
    return (
      <FormGroupPrimary
        inputProps={inputProps}
        buttonProps={buttonProps}
        textProps={textProps}
        />
    );
  }
}

function mapStateToProps({ decks, activeDeck }){
  return {
    deck: decks[activeDeck],
  };
}

export default connect(mapStateToProps)(AddCard);
