import React from "react";
import { View, Text } from "react-native";
import ButtonSecondary from "./ButtonSecondary";
import styles from "../styles/homeCategorySelector";

export default function HomeCategorySelector({ category, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Category: </Text>
      <ButtonSecondary onPress={onPress}>{category.length > 20 ? category.slice(0, 21) : category}</ButtonSecondary>
    </View>
  );
}
