import { StyleSheet, Dimensions } from "react-native";
import { WHITE } from "./shared";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    height: (Dimensions.get("window").height)*.75,
    width: (Dimensions.get("window").width)*.90,
    backgroundColor: WHITE,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
