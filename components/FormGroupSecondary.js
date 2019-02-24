import React from "react";
import TextInputSecondary from "./TextInputSecondary";
import SubmitGroupPrimary from "./SubmitGroupPrimary";

export default function FormGroupSecondary({ inputProps, buttonProps, textProps }) {
  // input props is array of obj
  return (
    <>
      {inputProps.map((obj) => (
        <TextInputSecondary
          placeholder={obj.placeholder}
          onChangeText={obj.onChangeText}
          value={obj.value}
          label={obj.label}
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
