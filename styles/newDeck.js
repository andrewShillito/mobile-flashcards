import { StyleSheet, Dimensions } from "react-native";
import { PURPLE, WHITE, BLACK } from "../styles/shared";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: WHITE,
  },
  header: {
    fontSize: 30,
    color: PURPLE,
  },
  text: {
    fontSize: 15,
    color: PURPLE,
  },
  picker: {
    width: Dimensions.get("window").width,
    flex: 1,
  },
  pickerText: {
    fontSize: 25,
    color: BLACK,
  }
});
