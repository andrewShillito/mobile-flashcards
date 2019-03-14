import { StyleSheet, Dimensions } from "react-native";
import { BACKGROUND_PRIMARY, BLACK, WHITE } from "./shared";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  content: {
    height: (Dimensions.get("window").height)*.33,
    width: (Dimensions.get("window").width),
    backgroundColor: WHITE,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
