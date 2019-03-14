import { StyleSheet, Dimensions } from "react-native";
import { PURPLE } from "./shared";

export default StyleSheet.create({
  picker: {
    flex: 1,
    width: (Dimensions.get("window").width),
  },
  text: {
    fontSize: 25,
    color: PURPLE,
  }
});
