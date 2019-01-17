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
    justifyContent: "center",
  },
  input: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  label: {
    flex: 1,
    fontSize: 30,
  },
  header: {
    fontSize: 30,
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
  text: {
    color: "white",
    fontSize: 30,
  },
});
