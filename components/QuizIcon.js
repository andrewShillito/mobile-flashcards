import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { INACTIVE_COLOR, LIGHT_PURPLE, NAV_ICON_SIZE } from "../styles/shared";

export default function QuizIcon({ onPress, active }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons
        name="cards" size={NAV_ICON_SIZE} color={active ? LIGHT_PURPLE : INACTIVE_COLOR}>
      </MaterialCommunityIcons>
    </TouchableOpacity>
  );
}
