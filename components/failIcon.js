import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "../styles/failIcon";
import { RED, QUIZ_ICON_SIZE } from "../styles/shared";

export default function failIcon({ onPress, text }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <FontAwesome name="window-close" size={QUIZ_ICON_SIZE} color={RED} />
    </TouchableOpacity>
  );
}
