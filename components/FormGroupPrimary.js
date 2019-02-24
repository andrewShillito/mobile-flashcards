import React from "./react";
import { View } from "react-native";
import TextInputPrimary from "./TextInputPrimary";
import SubmitGroupPrimary from "./SubmitGroupPrimary";

export default function FormGroupPrimary({ inputProps, onPress, color }) { // input props is array of obj
  return (
    <View>
      {inputProps.map((obj) => {
        <TextInputPrimary
          placeholder={obj.placeholder}
          onChangeText={obj.onChangeText}
          value={obj.value}
        />
      })}
      <SubmitGroupPrimary
        onPress={onPress}
        color={color}
        message={message}
        />
    </View>
  );
}
