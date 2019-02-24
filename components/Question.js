import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/question.js"

export default class Question extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.question}>{this.props.question}</Text>
        { this.props.showAnswer
          ? <Text style={styles.answer}>{this.props.answer}</Text>
          : <Text style={styles.answer}></Text>
        }
      </View>
    );
  }
}
