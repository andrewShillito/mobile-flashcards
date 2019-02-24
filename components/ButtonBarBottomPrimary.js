import React from "react";
import { View } from "react-native";
import ButtonWarning from "./ButtonWarning";
import ButtonSecondary from "./ButtonSecondary";
import styles from "../styles/buttonBarBottomPrimary";

export default function ButtonBarBottomPrimary({ leftText, rightText, onPressLeft, onPressRight }) {
  return (
    <View style={styles.container}>
      <ButtonSecondary onPress={onPressLeft}>{leftText}</ButtonSecondary>
      <ButtonWarning onPress={onPressRight}>{rightText}</ButtonWarning>
    </View>
  );
}
