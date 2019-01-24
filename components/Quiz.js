import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Question from "./Question";
import SubmitBtn from "./SubmitBtn";
import { FontAwesome } from "@expo/vector-icons"

class Quiz extends React.Component {
  state = {
    index: 0,
    showAnswer: false,
    message: "Show Answer",
    numCorrect: 0,
    scoreData: {},
  }
  increment = () => {
    this.setState((prevState) => ({
      index: prevState.index+1,
      showAnswer: false,
    }));
  }
  decrement = () => {
    if (this.state.index === 0) {
      alert("Already at first card");
      return;
    }
    this.setState((prevState) => ({
      index: prevState.index-1,
      showAnswer: false,
    }));
  }
  toggleShowAnswer = () => {
    this.setState((prevState) => ({
      showAnswer: !prevState.showAnswer,
      message: prevState.message === "Show Answer" ? "Hide Answer" : "Show Answer",
    }));
  }
  markCorrect = () => {
    this.setState((prevState) => {
      let scoreData = { ...prevState.scoreData, [prevState.index]: true };
      return {
        numCorrect: this.getNumCorrect(scoreData),
        scoreData,
      };
    })
  }
  markIncorrect = () => {
    this.setState((prevState) => {
      let scoreData = { ...prevState.scoreData, [prevState.index]: false }
      return {
        numCorrect: this.getNumCorrect(scoreData),
        scoreData,
      };
    })
  }
  getNumCorrect = (scoreData) => {
    return Object.keys(scoreData).reduce((acc, curr) => {
      if (scoreData[curr] === true) {
        return acc + 1;
      }
      return acc;
    }, 0)
  }
  render() {
    const deck = this.props.deck;
    console.log("Quiz State:", this.state);
    if (this.state.index < deck.questions.length) {
      const card = deck.questions[this.state.index];
      const { question, answer } = card;
      return (
        <View style={{justifyContent: "space-between", flex: 1}}>
          <Text style={{alignSelf: "center", justifyContent: "flex-start", fontSize: 20}}>{`${this.state.index + 1} of ${deck.questions.length}`}</Text>
          <Question question={question} answer={answer} showAnswer={this.state.showAnswer} />
          <SubmitBtn onPress={this.toggleShowAnswer} type="textButton">{this.state.message}</SubmitBtn>
          <View style={{flexDirection: "row", justifyContent: "space-around"}}>
            <TouchableOpacity onPress={this.markIncorrect} style={{justifyContent: "center", alignItems: "center"}}>
              <Text style={{fontSize: 20, marginBottom: 5}}>Incorrect</Text>
              <FontAwesome name="window-close" size={50} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.markCorrect} style={{justifyContent: "center", alignItems: "center"}}>
              <Text style={{fontSize: 20, marginBottom: 5}}>Correct</Text>
              <FontAwesome name="check-square-o" size={50} color="green" />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end"}}>
            <SubmitBtn onPress={this.decrement} type="textButton">Previous Question</SubmitBtn>
            <SubmitBtn onPress={this.increment} type="textButton">Next Question</SubmitBtn>
          </View>

        </View>
      );
    }
    return (
      <View>
        <Text>Placeholder all done</Text>
      </View>
    );
  }
}

function mapStateToProps({ decks, activeDeck }) {
  return {
    deck: decks[activeDeck],
  };
}

export default connect(mapStateToProps)(Quiz);
