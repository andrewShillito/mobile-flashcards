import React from "react";
import { View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import SubmitBtn from "./SubmitBtn";
import { inputStyles } from "../styles";
import { handleAddCard } from "../actions/cards";

class AddCard extends React.Component {
  state = {
    question: "",
    answer: "",
    message: "Submit to add a new card",
    messageColor: "#28a745",
    duplicateCardMessage: "Card already exists",
    emptyInputMessage: "Must complete both fields",
    successMessage: "Ready for submission",
    inputTooLongMessage: "Max input length exceeded",
    warningColor: "#dc3545",
    successColor: "#28a745",
    maxInputLength: 120,
  }
  onChange = ({value, name}) => {
    this.setState(() => ({
      [name]: value,
    }), this.validateInput);
  }
  validateInput = () => {
    const { questions } = this.props.deck;
    if (this.state.question.length && this.state.answer.length) {
      if (questions.some((card) => card.question === this.state.question && card.answer === this.state.answer)) {
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
  render() {
    const message = this.state.message;
    const color = this.state.messageColor;

    return (
      <View style={{flex:1, justifyContent: "space-evenly", alignItems: "center"}}>
        <View style={inputStyles.inputContainer}>
          <TextInput
            style={inputStyles.input}
            placeholder="Question"
            onChangeText={(question) => this.onChange({ value: question, name: "question" })}
            value={this.state.question}
            maxLength={120}
            />
        </View>
        <View style={inputStyles.inputContainer}>
          <TextInput
            style={inputStyles.input}
            placeholder="Answer"
            onChangeText={(answer) => this.onChange({ value: answer, name: "answer" })}
            value={this.state.answer}
            maxLength={120}
            />
        </View>
        <View>
          <SubmitBtn onPress={this.onSubmit}>Add Card</SubmitBtn>
          <View style={{alignItems: "center"}}>
            <Text style={{color: color}}>{message}</Text>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps({ decks, activeDeck }){
  return {
    deck: decks[activeDeck],
  };
}

export default connect(mapStateToProps)(AddCard);
