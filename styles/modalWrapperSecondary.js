import { StyleSheet, Dimensions } from "react-native";
import { BACKGROUND_PRIMARY } from "./shared";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    height: (Dimensions.get("window").height)*.33,
    width: (Dimensions.get("window").width)*.90,
    backgroundColor: BACKGROUND_PRIMARY,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
