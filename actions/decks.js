import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, EDIT_TITLE } from "./types";
import { saveDeckTitle, getDeck, getDecks, deleteDeck, editDeckTitle } from "../utils/api";
import { setActiveDeck, clearActiveDeck } from "./activeDeck";
import { startLoading, endLoading } from "./loading";

const receiveDecks = (decks) => {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export const handleReceiveDecks = () => {
  return dispatch => { //passed dispatch from redux-thunk middleware
    // implement loading
    // dispatch(startLoading()); // not necessary as loading is currently extremely quick
    return getDecks()
      .then(decks => {
        // dispatch(endLoading()); // not necessary as laoding is currently extremely quick
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
        dispatch(setActiveDeck(title));
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
      .then(() => {
        dispatch(removeDeck(title));
        dispatch(clearActiveDeck());
      })
      .catch((err) => console.log(err));
  };
}

const editTitle = (oldTitle, newDeck) => {
  return {
    type: EDIT_TITLE,
    oldTitle,
    newDeck,
  };
}

export const handleEditTitle = (oldTitle, newTitle) => {
  return dispatch => {
    return editDeckTitle(oldTitle, newTitle)
      .then((newDeck) => {
        dispatch(setActiveDeck(newDeck.title));
        dispatch(editTitle(oldTitle, newDeck));
      })
      .catch((err) => console.log(err));
  };
}
