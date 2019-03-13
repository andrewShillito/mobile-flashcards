import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import ScoreDetails from "./ScoreDetails";
import { clearLocalNotifications, setLocalNotification } from "../utils/notifications";
import QuizItem from "./QuizItem";
import QuizScore from "./QuizScore";

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
    });
  }
  getNumCorrect = (scoreData) => {
    return Object.keys(scoreData).reduce((acc, curr) => {
      if (scoreData[curr] === true) {
        return acc + 1;
      }
      return acc;
    }, 0)
  }
  goToDeckDetail = () => {
    this.setState(() => ({
      index: 0,
      showAnswer: false,
      message: "Show Answer",
      numCorrect: 0,
      scoreData: {},
    }));
    this.props.navigation.navigate("DeckDetail");
  }
  startOver = () => {
    this.setState(() => ({
      index: 0,
      showAnswer: false,
      message: "Show Answer",
      numCorrect: 0,
      scoreData: {},
    }));
  }
  getScoreDetails = () => {
    this.props.navigation.navigate("ScoreDetails");
  }
  onPressCorrect = () => {
    this.markCorrect();
    this.increment();
  }
  onPressIncorrect = () => {
    this.markIncorrect();
    this.increment();
  }
  recordScore = () => {
    // record score in decks_score table
    // update last_tested and last_score in decks table
    // update redux decks score info
    // end
  }
  render() {
    const deck = this.props.deck;
    if (this.state.index < deck.questions.length) {
      const card = deck.questions[this.state.index];
      const { question, answer } = card;
      return (
        <QuizItem
          message={this.state.message}
          toggleShowAnswer={this.toggleShowAnswer}
          showAnswer={this.state.showAnswer}
          progress={`${this.state.index + 1} of ${deck.questions.length}`}
          onPressIncorrect={this.onPressIncorrect}
          onPressCorrect={this.onPressCorrect}
          answer={answer}
          question={question}
          />
      );
    }

    else {
      clearLocalNotifications(); // quiz completed so clear existing notification(s)
      // setLocalNotification(); // set new notification for tomorrow - commented to prevent dev notifications

      this.recordScore();

      return (
        <QuizScore
          numCorrect={`${this.state.numCorrect} out of ${deck.questions.length} correct`}
          percentCorrect={`${Number(Math.round((this.state.numCorrect/deck.questions.length)+'e2')+"e-2")*100}%`}
          startOver={this.startOver}
          getScoreDetails={this.getScoreDetails}
          goToDeckDetail={this.goToDeckDetail}
          />
      );
    }
  }
}

function mapStateToProps({ decks, activeDeck }) {
  return {
    deck: decks[activeDeck],
  };
}

export default connect(mapStateToProps)(Quiz);
