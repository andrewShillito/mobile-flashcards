import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { NAV_ICON_SIZE, GREEN } from "../styles/shared";

export default function EditIcon({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome name="edit" size={NAV_ICON_SIZE} color={GREEN}></FontAwesome>
    </TouchableOpacity>
  );
}
