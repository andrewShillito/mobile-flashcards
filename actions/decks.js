import {
  RECEIVE_DECKS,
  ADD_DECK,
  REMOVE_DECK,
} from "./types";

export const receiveDecks = (decks) => {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    deck,
  };
}

export const removeDeck = (title) => {
  return {
    type: REMOVE_DECK,
    title,
  };
}
