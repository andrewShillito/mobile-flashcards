import React from "react";
import { View, Text, } from "react-native";
import Question from "./Question";
import ButtonSecondary from "./ButtonSecondary";
import IncorrectIcon from "./IncorrectIcon";
import SuccessIcon from "./SuccessIcon";
import styles from "../styles/quizItem";

export default function QuizItem({ onPressCorrect, onPressIncorrect, toggleShowAnswer, message, showAnswer, answer, question, progress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{progress}</Text>
      <Question question={question} answer={answer} showAnswer={showAnswer} />
      <ButtonSecondary onPress={toggleShowAnswer}>{message}</ButtonSecondary>
      <View style={styles.iconContainer}>
        <IncorrectIcon
          text="Incorrect"
          onPress={onPressIncorrect}
          />
        <SuccessIcon
          text="Correct"
          onPress={onPressCorrect}
          />
      </View>
    </View>
  );
}
