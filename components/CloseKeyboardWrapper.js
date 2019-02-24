import React from "react";
import { TouchableWithoutFeedback, View, Keyboard } from "react-native";

export default function CloseKeyboardWrapper({ containerStyle, children }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={containerStyle}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}
