import {
  RECEIVE_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD,
  REMOVE_CARD,
  SET_ACTIVE_DECK,
  CLEAR_ACTIVE_DECK,
  EDIT_TITLE,
} from "../actions/types";
import { combineReducers } from "redux";

function decks(store = {}, action) {
  console.log("Reducer:", action)
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
        ...action.deck,
      }
    case REMOVE_DECK:
      newState = {
        ...store,
      };
      delete newState[action.title];
      return newState;
    case EDIT_TITLE:
      console.log("Creating new State:", action.type, action.oldTitle, action.newDeck);
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
        [action.title]: {
          ...store[action.title],
          "questions": store[action.title].questions.filter((question) => {
            return (question.question !== action.card.question || question.answer !== action.card.answer);
          })
        }
      };
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

export default combineReducers({
  decks,
  activeDeck,
});
