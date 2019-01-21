import React from "react";
import { View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import RouteTitle from "./RouteTitle";
import SubmitBtn from "./SubmitBtn";
import { inputStyles } from "../styles";

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
    return (this.state.question.length && this.state.answer.length);
  }
  onSubmit = () => {
    console.log(this.state);
  }
  render() {
    const title = this.props.navigation.state.params.title;
    const validInput = this.validateInput;

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
        <SubmitBtn disabled={!validInput} onPress={this.onSubmit}>Submit</SubmitBtn>
      </View>
    );
  }
}



export default connect()(AddCard);
