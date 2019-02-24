import React from 'react';
import { View, TextInput, Text } from 'react-native';
import styles from "../styles/textInputSecondary";
import { MAX_SHORT_INPUT_LENGTH, BLUE, BLACK } from "../styles/shared";

export default function TextInputSecondary({ onChangeText, value, placeholder, label }){
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={(title) => onChangeText(title)}
          value={value}
          maxLength={MAX_SHORT_INPUT_LENGTH}
          selectionColor={BLUE}
          />
      </View>
    </>
  );
}
