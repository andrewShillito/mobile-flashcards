import React from "react";
import { View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import RouteTitle from "./RouteTitle";
import SubmitBtn from "./SubmitBtn";
import { inputStyles } from "../styles";
import { handleAddCard } from "../actions/cards";

class AddCard extends React.Component {
  state = {
    question: "",
    answer: "",
  }
  onChange = ({value, name}) => {
    this.setState(() => ({
      [name]: value,
    }));
  }
  validateInput = () => {
    if (this.state.question.length && this.state.answer.length) {
      return true;
    }
    return false;
  }
  generateMessage = () => {
    if (this.validateInput()) {
      return "Ready for submission";
    }
    return "Must complete both fields";
  }
  onSubmit = () => {
    if (this.validateInput()) {
      const newCard = {
        question: this.state.question,
        answer: this.state.answer,
      };
      console.log("New Card:", newCard);
      this.props.dispatch(handleAddCard(this.props.deck.title, newCard));
      this.props.navigation.navigate("DeckDetail");
    }
    else {
      alert("Must complete both fields");
    }
  }
  render() {
    const title = this.props.navigation.state.params.title;
    const message = this.generateMessage();
    const color = message === "Ready for submission" ? "green" : "red";

    return (
      <View style={{flex:1, justifyContent: "space-evenly", alignItems: "center"}}>
        <View style={inputStyles.inputContainer}>
          <TextInput
            style={inputStyles.input}
            placeholder="Question"
            onChangeText={(question) => this.onChange({ value: question, name: "question" })}
            value={this.state.question}
            />
        </View>
        <View style={inputStyles.inputContainer}>
          <TextInput
            style={inputStyles.input}
            placeholder="Answer"
            onChangeText={(answer) => this.onChange({ value: answer, name: "answer" })}
            value={this.state.answer}
            />
        </View>
        <View>
          <SubmitBtn onPress={this.onSubmit}>Submit</SubmitBtn>
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
