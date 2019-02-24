import React from "react";
import TextInputPrimary from "./TextInputPrimary";
import SubmitGroupPrimary from "./SubmitGroupPrimary";

export default function FormGroupPrimary({ inputProps, buttonProps, textProps }) {
  // input props is array of obj
  return (
    <>
      {inputProps.map((obj) => (
        <TextInputPrimary
          placeholder={obj.placeholder}
          onChangeText={obj.onChangeText}
          value={obj.value}
          key={obj.placeholder}
        />
      ))}
      <SubmitGroupPrimary
        onPress={buttonProps.onPress}
        color={textProps.color}
        message={textProps.message}
        buttonText={buttonProps.text}
        />
    </ >
  );
}
