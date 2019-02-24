import React from "react";
import { View, Text, } from "react-native";
import styles from "../styles/scoreBasicDetails";

export default function ScoreBasicDetails({ numCorrect, percentCorrect }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{numCorrect}</Text>
      <Text style={[styles.text, styles.marginTop]}>{percentCorrect}</Text>
    </View>
  );
}
