import { StyleSheet } from "react-native";
import { BACKGROUND_PRIMARY, PURPLE } from "../styles/shared";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: BACKGROUND_PRIMARY,
  },
  header: {
    fontSize: 30,
    color: PURPLE,
  },
});
