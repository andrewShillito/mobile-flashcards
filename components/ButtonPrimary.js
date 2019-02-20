import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/buttonPrimary";

function ButtonPrimary({ onPress, children }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

export default ButtonPrimary;
