import React from "react";
import { View, Text } from "react-native";
import ButtonSecondary from "./ButtonSecondary";
import styles from "../styles/homeCategorySelector";

export default function HomeCategorySelector({ category, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{"Showing "}
        <Text style={styles.category}>{category.length > 20 ? category.slice(0, 21) : category}</Text>
      </Text>
      <ButtonSecondary onPress={onPress}>Select Category</ButtonSecondary>
    </View>
  );
}