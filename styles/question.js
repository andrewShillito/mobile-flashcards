import { StyleSheet } from "react-native";
import { BACKGROUND_PRIMARY } from "./shared";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  question: {
    fontSize: 35,
    marginTop: 20,
    alignSelf: "center",
  },
  answer: {
    fontSize: 30,
    marginTop: 30,
    alignSelf: "center",
  },
  hidden: {
    color: BACKGROUND_PRIMARY,
  },
});
