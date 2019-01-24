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
    backgroundColor: "steelblue",
    height: 150,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderRadius: 5,
  },
  deckHeader: {
    color: "white",
    fontSize: 30,
  },
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
    marginHorizontal: 60,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    borderRadius: 5,
    paddingHorizontal: 40,
  },
  submitBtnText: {
    color: "white",
    fontSize: 30,
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
  }
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
