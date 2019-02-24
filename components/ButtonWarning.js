import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../styles/buttonWarning";

function ButtonWarning({ onPress, children }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

export default ButtonWarning;
