import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, EDIT_TITLE } from "./types";
import { saveDeckTitle, getDeck, getDecks, deleteDeck, editDeckTitle } from "../utils/api";
import { setActiveDeck } from "./activeDeck";

const receiveDecks = (decks) => {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export const handleReceiveDecks = () => {
  return dispatch => { //passed dispatch from redux-thunk middleware
    // implement loading
    return getDecks()
      .then(decks => {
        dispatch(receiveDecks(decks));
      })
      .catch(err => console.log(err));
  };
}

const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    deck,
  };
}

export const handleAddDeck = (title) => {
  return dispatch => {
    return saveDeckTitle(title)
      .then(deck => {
        dispatch(addDeck(deck));
      })
      .catch(err => console.log(err));
  };
}

const removeDeck = (title) => {
  return {
    type: REMOVE_DECK,
    title,
  };
}

export const handleRemoveDeck = (title) => {
  return dispatch => {
    return deleteDeck(title)
      .then(() => dispatch(removeDeck(title)))
      .catch((err) => console.log(err));
  };
}

const editTitle = (oldTitle, newDeck) => {
  console.log("Action Creator:", oldTitle, newDeck);
  return {
    type: EDIT_TITLE,
    oldTitle,
    newDeck,
  };
}

export const handleEditTitle = (oldTitle, newTitle) => {
  console.log("Handle func:", oldTitle, newTitle);
  return dispatch => {
    return editDeckTitle(oldTitle, newTitle)
      .then((newDeck) => { // can refactor to accept the new deck instead of re-doing creation in the reducer
        console.log("NEW DECK CREATED IN _DATA:", newDeck);
        dispatch(setActiveDeck(newDeck.title));
        dispatch(editTitle(oldTitle, newDeck));
      })
      .catch((err) => console.log(err));
  };
}
