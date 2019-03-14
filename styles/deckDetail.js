import { StyleSheet, Dimensions } from "react-native";
import { BLACK } from "./shared";

export default StyleSheet.create({
  picker: {
    width: Dimensions.get("window").width,
    flex: 1,
  },
  pickerText: {
    fontSize: 25,
    color: BLACK,
  },
});
