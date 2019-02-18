import {
  RECEIVE_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD,
  REMOVE_CARD,
  EDIT_CARD,
  SET_ACTIVE_DECK,
  CLEAR_ACTIVE_DECK,
  EDIT_TITLE,
  SET_ACTIVE_CARD,
  CLEAR_ACTIVE_CARD,
} from "../actions/types";
import { combineReducers } from "redux";

function decks(store = {}, action) {
  // console.log("Reducer:", action)
  let newState;
  switch(action.type) {
    case RECEIVE_DECKS:
      return {
        ...store,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...store,
        [action.deck.title]: action.deck,
      }
    case REMOVE_DECK:
      newState = {
        ...store,
      };
      delete newState[action.title];
      return newState;
    case EDIT_TITLE:
      newState = {
        ...store,
        [action.newDeck.title]: action.newDeck,
      }
      delete newState[action.oldTitle];

      return newState;
    case ADD_CARD:
      return {
        ...store,
        [action.title]: {
          ...store[action.title],
          "questions": store[action.title].questions.concat([action.card])
        }
      };
    case REMOVE_CARD:
      return {
        ...store,
        [action.deckTitle]: {
          ...store[action.deckTitle],
          "questions": store[action.deckTitle].questions.filter((question, index) => index !== action.cardIndex),
        },
      };
    case EDIT_CARD:
      return {
        ...store,
        [action.deckTitle]: {
          ...action.deck,
        }
      }
    default:
      return store;
  }
}

function activeDeck(store = null, action) {
  switch (action.type) {
    case SET_ACTIVE_DECK:
      return action.title;
    case CLEAR_ACTIVE_DECK:
      return null;
    default:
      return store;
  }
}

function activeCard(store = null, action) {
  switch (action.type) {
    case SET_ACTIVE_CARD:
      return action.card;
    case CLEAR_ACTIVE_CARD:
      return null;
    default:
      return store;
  }
}

export default combineReducers({
  decks,
  activeDeck,
  activeCard,
});
