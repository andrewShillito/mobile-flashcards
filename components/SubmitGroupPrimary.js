import React from "./react";
import { View } from "react-native";
import ButtonPrimary from "./ButtonPrimary";
import InputFeedbackText from "./InputFeedbackText";

export default function SubmitGroupPrimary({ onPress, message, color}) {
  return (
    <View>
      <ButtonPrimary onPress={onPress}></ButtonPrimary>
      <InputFeedbackText color={color}>{message}</InputFeedbackText>
    </View>
  )
}
