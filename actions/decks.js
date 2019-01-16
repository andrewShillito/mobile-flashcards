import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK } from "./types";
import { saveDeckTitle, getDeck, getDecks, deleteDeck } from "../utils/api";

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
