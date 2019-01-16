import {
  RECEIVE_DECKS,
  ADD_DECK,
  REMOVE_DECK,
} from "./types";

export const receiveDecks = () => {
  return {
    type: RECEIVE_DECKS,
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
