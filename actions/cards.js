import {
  ADD_CARD,
  REMOVE_CARD,
  EDIT_CARD,
} from "./types";
import {
  addCardToDeck,
  deleteCard,
  editCard as _editCard,
} from "../utils/api";
import { clearActiveCard } from "./activeCard";
import { createCard, getAllCards, getCardsFromDeck, removeCard as _removeCard, updateCard } from "../SQLite/";


export const addCard = (card) => {
  return {
    type: ADD_CARD,
    card,
  };
}

export const handleAddCard = (deckTitle, { question, answer}) => {
  return dispatch => {
    return createCard(deckTitle, question, answer)
      .then((rowsArr) => {
        dispatch(addCard(rowsArr[0]));
      })
      .catch((err) => console.log(err));
  };
}

export const removeCard = (deckTitle, card_id) => {
  return {
    type: REMOVE_CARD,
    deckTitle,
    card_id,
  };
}

export const handleRemoveCard = (deckTitle, card_id) => {
  return dispatch => {
    return _removeCard(card_id)
      .then(() => {
        dispatch(removeCard(deckTitle, card_id));
      })
      .then(() => dispatch(clearActiveCard()))
      .catch((err) => console.log(err));
  };
}

export const editCard = (card) => {
  return {
    type: EDIT_CARD,
    card,
  };
}

export const handleEditCard = (card_id, { question, answer }) => {
  return dispatch => {
    return updateCard(card_id, question, answer)
      .then((card) => {
        dispatch(editCard(card));
      })
      .then(() => dispatch(clearActiveCard()))
      .catch((err) => console.log(err));
  };
}
