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

export const removeCard = (deckTitle, cardIndex) => {
  return {
    type: REMOVE_CARD,
    deckTitle,
    cardIndex,
  };
}

export const handleRemoveCard = (deckTitle, cardIndex) => {
  return dispatch => {
    return deleteCard(deckTitle, cardIndex)
      .then((deck) => {
        console.log("remove card deck:", deck);
        dispatch(removeCard(deckTitle, cardIndex));
      })
      .then(() => dispatch(clearActiveCard()))
      .catch((err) => console.log(err));
  };
}

export const editCard = (deckTitle, deck) => {
  return {
    type: EDIT_CARD,
    deckTitle,
    deck,
  };
}

export const handleEditCard = (deckTitle, cardIndex, newCard) => {
  return dispatch => {
    return _editCard(deckTitle, cardIndex, newCard)
      .then((deck) => {
        dispatch(editCard(deckTitle, deck));
      })
      .then(() => dispatch(clearActiveCard()))
      .catch((err) => console.log(err));
  };
}
