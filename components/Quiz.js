import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import Question from "./Question";
import SubmitBtn from "./SubmitBtn"

class Quiz extends React.Component {
  state = {
    index: 0,
    showAnswer: false,
    message: "Show Answer",
  }
  increment = () => {
    this.setState((prevState) => ({
      index: prevState.index+1,
      showAnswer: false,
    }));
  }
  decrement = () => {
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
  render() {
    const deck = this.props.deck;

    if (this.state.index < deck.questions.length) {
      const card = deck.questions[this.state.index];
      const { question, answer } = card;
      return (
        <View>
          <Text>{`${this.state.index + 1} of ${deck.questions.length}`}</Text>
          <Question question={question} answer={answer} showAnswer={this.state.showAnswer} />
          <SubmitBtn onPress={this.toggleShowAnswer}>{this.state.message}</SubmitBtn>
          <SubmitBtn onPress={this.increment}>Next Question</SubmitBtn>
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
