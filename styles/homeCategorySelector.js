import { StyleSheet } from "react-native";
import { PURPLE, BLUE } from "./shared";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: PURPLE,
    margin:15,
  },
});
