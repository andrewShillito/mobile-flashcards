import { StyleSheet, Dimensions } from "react-native";
import { PURPLE } from "./shared";

export default StyleSheet.create({
  picker: {
    flex: 1,
    width: (Dimensions.get("window").width)*.90,
  },
  text: {
    fontSize: 25,
    color: PURPLE,
  }
});
