import React from "react";
import { TouchableWithoutFeedback, View, KeyBoard } from "react-native";

export default function CloseKeyboardWrapper({ containerStyle, children }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={containerStyle}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}
