import React from "react";
import { View, Text } from "react-native";

export default function InputFeedbackText({ children, color }) {
  return (
    <View style={{alignItems: "center"}}>
      <Text style={{color: color}}>{children}</Text>
    </View>
  );
}
