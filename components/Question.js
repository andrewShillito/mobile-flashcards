import React from "react";
import { View, Text } from "react-native";
import SubmitBtn from "./SubmitBtn";

export default class Question extends React.Component {
  render() {
    return (
      <View style={{alignItems: "center", justifyContent: "space-between", marginHorizontal: 10}}>
        <Text style={{fontSize: 35, marginTop: 20, alignSelf: "center"}}>{this.props.question}</Text>
        { this.props.showAnswer
          ? <Text style={{fontSize: 30, marginTop: 30, alignSelf: "center"}}>{this.props.answer}</Text>
          : <Text style={{fontSize: 30, marginTop: 30}}></Text>
        }
      </View>
    );
  }
}
