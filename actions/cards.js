import {
  ADD_CARD,
  REMOVE_CARD,
} from "./types";

export const addCard = (title, card) => {
  return {
    type: ADD_CARD,
    title,
    card,
  };
}

export const removeCard = (title, card) => {
  return {
    type: REMOVE_CARD,
    title,
    card,
  };
}
