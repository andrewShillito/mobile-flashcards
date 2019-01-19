import { SET_ACTIVE_DECK, CLEAR_ACTIVE_DECK } from "./types";

export const setActiveDeck = function(title) {
  return {
    type: SET_ACTIVE_DECK,
    title,
  };
}

export const clearActiveDeck = function() {
  return {
    type: CLEAR_ACTIVE_DECK,
  }
}
