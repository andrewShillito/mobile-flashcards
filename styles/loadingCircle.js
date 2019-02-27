import { StyleSheet } from "react-native";
import { BLUE, WHITE } from "./shared";

const dimen1 = 192;
const dimen2 = 160;
const dimen3 = 128;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  loaderContainer: {
    position: "relative",
    margin: "auto",
    height: dimen1,
    width: dimen1,
  },
  circle1: {
    height: dimen1,
    width: dimen1,
    position: "absolute",
    borderStyle: "solid",
    borderWidth: 7,
    borderRadius: dimen1/2,
    borderTopColor: BLUE,
    borderRightColor: WHITE,
    borderBottomColor: BLUE,
    borderLeftColor: WHITE,
  },
  circle2: {
    height: dimen2,
    width: dimen2,
    position: "absolute",
    borderStyle: "solid",
    borderWidth: 6,
    borderRadius: dimen2/2,
    borderTopColor: WHITE,
    borderRightColor: WHITE,
    borderBottomColor: WHITE,
    borderLeftColor: BLUE,
  },
  circle3: {
    height: dimen3,
    width: dimen3,
    position: "absolute",
    borderStyle: "solid",
    borderWidth: 5,
    borderRadius: dimen3/2,
    borderTopColor: WHITE,
    borderRightColor: BLUE,
    borderBottomColor: WHITE,
    borderLeftColor: WHITE,
  },
  text: {
    color: WHITE,
    fontSize: 25,
  },
});
