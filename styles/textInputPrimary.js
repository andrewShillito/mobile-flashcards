import { StyleSheet } from "react-native";
import { BLACK, WHITE } from "./shared";

export default StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderColor: WHITE,
    borderBottomColor: BLACK,
    borderWidth: 1,
    width: 270,
  },
  input: {
    marginHorizontal: 20,
    fontSize: 30,
    paddingBottom: 5,
  },
});
