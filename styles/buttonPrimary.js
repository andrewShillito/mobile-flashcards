import { StyleSheet } from "react-native";
import { BLUE, WHITE } from "./shared";

export default StyleSheet.create({
  button: {
    backgroundColor: BLUE,
    marginVertical: 20,
    // marginHorizontal: 60,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: WHITE,
    fontSize: 20,
  },
});
