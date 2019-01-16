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
    borderRadius: 5
  },
  text: {
    color: "white",
    fontSize: 30,
  },
});
