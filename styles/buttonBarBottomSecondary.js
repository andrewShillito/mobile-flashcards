import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: (Dimensions.get("window").width),
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
});
