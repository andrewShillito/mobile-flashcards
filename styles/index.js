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
    backgroundColor: "blue",
    height: 150,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderColor: "black",
    borderRadius: 5,
  },
  deckHeader: {
    color: "white",
    fontSize: 30,
  },
});

export const cardStyles = StyleSheet.create({

});
