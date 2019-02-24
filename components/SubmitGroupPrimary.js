import React from "react";
import { View } from "react-native";
import ButtonPrimary from "./ButtonPrimary";
import InputFeedbackText from "./InputFeedbackText";

export default function SubmitGroupPrimary({ onPress, message, color, buttonText}) {
  return (
    <View>
      <ButtonPrimary onPress={onPress}>{buttonText}</ButtonPrimary>
      <InputFeedbackText color={color}>{message}</InputFeedbackText>
    </View>
  )
}
