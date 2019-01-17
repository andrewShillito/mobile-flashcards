import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { buttonStyles as styles } from "../styles";

function SubmitBtn({ onPress, children }) {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

export default SubmitBtn;
