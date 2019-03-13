import {
  SET_ACTIVE_CARD,
  CLEAR_ACTIVE_CARD,
} from "./types";

export const setActiveCard = function(card) {
  return {
    type: SET_ACTIVE_CARD,
    card,
  };
}

export const clearActiveCard = function() {
  return {
    type: CLEAR_ACTIVE_CARD,
  };
}
