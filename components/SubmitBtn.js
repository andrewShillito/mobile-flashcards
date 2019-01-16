import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { buttonStyles } from "../styles";

function SubmitBtn({ onPress, children }) {
  return (
    <TouchableOpacity style={buttonStyles.submitBtn}>
      <Text style={buttonStyles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

export default SubmitBtn;
