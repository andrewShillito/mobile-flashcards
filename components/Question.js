import React from "react";
import { View, Text } from "react-native";
import SubmitBtn from "./SubmitBtn";

export default class Question extends React.Component {
  render() {
    return (
      <View>
        <Text>{this.props.question}</Text>
        { this.props.showAnswer
          ? <Text>{this.props.answer}</Text>
          : <Text></Text>
        }
      </View>
    );
  }
}
