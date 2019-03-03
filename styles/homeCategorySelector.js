import { StyleSheet } from "react-native";
import { PURPLE } from "./shared";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  text: {
    fontSize: 20
  },
  category: {
    color: PURPLE,
  }
});
