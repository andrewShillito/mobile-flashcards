import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { BLUE, NAV_ICON_SIZE } from "../styles/shared";

export default function InfoIcon({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome name="info" size={NAV_ICON_SIZE} color={BLUE}></FontAwesome>
    </TouchableOpacity>
  );
}
