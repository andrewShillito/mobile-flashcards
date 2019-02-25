import React from "react";
import { View, Text, } from "react-native";
import Question from "./Question";
import ButtonBarBottomSecondary from "./ButtonBarBottomSecondary";
import ButtonPrimary from "./ButtonPrimary";
import ScoreBasicDetails from "./ScoreBasicDetails";
import styles from "../styles/quizScore";

export default function QuizScore({ startOver, goToDeckDetail, getScoreDetails, numCorrect, percentCorrect, }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Score</Text>
      <ScoreBasicDetails
        numCorrect={numCorrect}
        percentCorrect={percentCorrect}
      />
      <ButtonPrimary onPress={getScoreDetails}>Details</ButtonPrimary>
      <ButtonBarBottomSecondary
        leftText="Retake Quiz"
        rightText="Deck Home"
        onPressLeft={startOver}
        onPressRight={goToDeckDetail}
      />
    </View>
  );
}

// leftText, rightText, onPressLeft, onPressRight
