import React from 'react';
import { View, TextInput } from 'react-native';
import styles from "../styles/textInputPrimary";
import { MAX_SHORT_INPUT_LENGTH } from "../styles/shared";

export default function TextInputPrimary({ onChangeText, value, placeholder }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        maxLength={MAX_SHORT_INPUT_LENGTH}
        />
    </View>
  );
}
