import {
  SET_ACTIVE_CARD,
  CLEAR_ACTIVE_CARD,
} from "./types";

export const setActiveCard = function(card) { // card will have question, answer, & deck props (strings)
  return {                                    // also an index prop - deck prop may be unnecessary
    type: SET_ACTIVE_CARD,
    card,
  };
}

export const clearActiveCard = function() {
  return {
    type: CLEAR_ACTIVE_CARD,
  };
}
