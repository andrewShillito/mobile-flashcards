import { StyleSheet } from "react-native";
import { BLUE, PURPLE, WHITE } from "./shared";

export default  StyleSheet.create({
  deck: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: WHITE,
    height: 150,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deckHeader: {
    color: PURPLE,
    fontSize: 35,
  },
  text: {
    color: BLUE,
    fontSize: 25,
  },
  container: {
    flexDirection: "row",
    flex: 1,
  },
  buttonContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});
