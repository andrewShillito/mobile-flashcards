import React from "react";
import { View } from "react-native";
import ButtonSecondary from "./ButtonSecondary";
import styles from "../styles/buttonBarBottomSecondary";

export default function ButtonBarBottomSecondary({ leftText, rightText, onPressLeft, onPressRight }) {
  return (
    <View style={styles.container}>
      <ButtonSecondary onPress={onPressLeft}>{leftText}</ButtonSecondary>
      <ButtonSecondary onPress={onPressRight}>{rightText}</ButtonSecondary>
    </View>
  );
}
