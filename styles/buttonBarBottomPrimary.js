import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-end",
    width: (Dimensions.get("window").width)*.90,
    paddingHorizontal: 5,
    paddingBottom: 2,
  },
});
