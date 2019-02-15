import { StyleSheet } from "react-native";

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export const deckStyles = StyleSheet.create({
  deck: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
    color: "#343a40",
    fontSize: 35,
  },
  text: {
    color: "#343a40",
    fontSize: 25,
  }
});

export const newStyles = StyleSheet.create({
  new: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    marginHorizontal: 20,
    fontSize: 30,
    paddingBottom: 5,
  },
  inputContainer: {
    borderStyle: "solid",
    borderColor: "white",
    borderBottomColor: "black",
    borderWidth: 1,
    width: 270,
  },
  label: {
    flex: 1,
    fontSize: 30,
  },
  header: {
    fontSize: 40,
  }
});

export const cardStyles = StyleSheet.create({

});

export const buttonStyles = StyleSheet.create({
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

export const inputStyles = StyleSheet.create({
  input: {
    marginHorizontal: 20,
    fontSize: 30,
    paddingBottom: 5,
  },
  inputContainer: {
    borderStyle: "solid",
    borderColor: "white",
    borderBottomColor: "black",
    borderWidth: 1,
    width: 270,
  },
  label: {
    fontSize: 30,
  },
})
