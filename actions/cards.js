import {
  ADD_CARD,
  REMOVE_CARD,
} from "./types";

import {
  addCardToDeck,
} from "../utils/api";

export const addCard = (title, card) => {
  return {
    type: ADD_CARD,
    title,
    card,
  };
}

export const handleAddCard = (deckTitle, card) => {
  return dispatch => {
    return addCardToDeck(deckTitle, card)
      .then((deck) => {
        dispatch(addCard(deckTitle, card));
      })
      .catch((err) => console.log(err));
  };
}

export const removeCard = (title, card) => {
  return {
    type: REMOVE_CARD,
    title,
    card,
  };
}
