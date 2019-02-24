import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "../styles/successIcon";
import { SUCCESS, QUIZ_ICON_SIZE } from "../styles/shared";

export default function SuccessIcon({ onPress, text }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <FontAwesome name="check-square-o" size={QUIZ_ICON_SIZE} color={SUCCESS} />
    </TouchableOpacity>
  );
}

// func: () => {this.markCorrect(); this.increment()}
// Correct
