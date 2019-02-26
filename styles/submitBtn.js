import { StyleSheet } from "react-native";

export default StyleSheet.create({
  submitBtn: {
    backgroundColor: "steelblue",
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
  submitBtnText: {
    color: "white",
    fontSize: 20,
  },
  textButton: {
    alignItems: "center",
    justifyContent: "center",
    color: "steelblue",
    margin: 15,
  },
  textButtonText: {
    color: "steelblue",
    fontSize: 20,
  },
  textDeleteButton: {
    alignItems: "center",
    justifyContent: "center",
    color: "steelblue",
    margin: 15,
  },
  textDeleteButtonText: {
    color: "#dc3545",
    fontSize: 20,
  },
});
