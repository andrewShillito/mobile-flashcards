import { StyleSheet } from "react-native";
import { BACKGROUND_PRIMARY, BLACK } from "./shared";

export default StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderColor: BACKGROUND_PRIMARY,
    borderBottomColor: BLACK,
    borderWidth: 1,
    width: 270,
  },
  input: {
    marginHorizontal: 20,
    fontSize: 30,
    paddingBottom: 5,
  },
  label: {
    fontSize: 20,
    fontStyle: "italic",
    marginLeft: 5,
    alignSelf: "flex-start",
  },
});
