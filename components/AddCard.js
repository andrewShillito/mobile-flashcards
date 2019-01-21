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
    let msg = '';
    (this.state.question.length && this.state.answer.length)
      ? msg = "Ready for submission"
      : msg = "Must complete both fields";
    return msg;
  }
  onSubmit = () => {
    if (this.validateInput()) {
      const newCard = {
        question: this.state.question,
        answer: this.state.answer,
      };
      handleAddCard(this.props.deck.title, newCard);
    }
    else {
      alert("Must complete both fields");
    }
  }
  render() {
    const title = this.props.navigation.state.params.title;
    const validInput = this.validateInput();

    return (
      <View style={{flex:1}}>
        <RouteTitle>{`Add card to ${title}`}</RouteTitle>
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
        <SubmitBtn onPress={this.onSubmit}>Submit</SubmitBtn>
        <View>
          <Text>{validInput}</Text>
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
