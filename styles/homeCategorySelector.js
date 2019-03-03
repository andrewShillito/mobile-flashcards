import { StyleSheet } from "react-native";
import { PURPLE, BLUE } from "./shared";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  text: {
    fontSize: 20,
    color: PURPLE,
  },
  category: {
    color: BLUE,
  }
});
