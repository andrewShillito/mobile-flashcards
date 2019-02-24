import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Question from "./Question";
import SubmitBtn from "./SubmitBtn";
import { FontAwesome } from "@expo/vector-icons";
import ScoreDetails from "./ScoreDetails";
import { clearLocalNotifications, setLocalNotification } from "../utils/notifications";
import ButtonSecondary from "./ButtonSecondary";
import IncorrectIcon from "./IncorrectIcon";
import SuccessIcon from "./SuccessIcon";
import QuizItem from "./QuizItem";

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
          />
      );
    }
    clearLocalNotifications(); // quiz completed so clear existing notification(s)
    // setLocalNotification(); // set new notification for tomorrow - commented to prevent dev notifications

    return (
      <View style={{flex: 1, justifyContent: "space-between"}}>
        <Text style={{fontSize: 40, alignSelf: "center", marginTop: 20}}>Score</Text>
        <View style={{alignItems: "center", justifyContent: "space-between"}}>
          <Text style={{fontSize: 30}}>{`${this.state.numCorrect} out of ${deck.questions.length} correct`}</Text>
          <Text style={{fontSize: 30, marginTop: 30}}>{`${Number(Math.round((this.state.numCorrect/deck.questions.length)+'e2')+"e-2")*100}%`}</Text>
        </View>
        <SubmitBtn onPress={this.getScoreDetails}>Details</SubmitBtn>
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end"}}>
          <SubmitBtn onPress={this.startOver} type="textButton">Retake Quiz</SubmitBtn>
          <SubmitBtn onPress={this.goToDeckDetail} type="textButton">Go to Deck Home</SubmitBtn>
        </View>
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
