import {
  RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, EDIT_TITLE,
  ADD_CARD, REMOVE_CARD, EDIT_CARD,
  SET_ACTIVE_DECK, CLEAR_ACTIVE_DECK,
  SET_ACTIVE_CARD, CLEAR_ACTIVE_CARD,
  START_LOADING, END_LOADING,
  ADD_CATEGORY, REMOVE_CATEGORY, RECEIVE_CATEGORIES, ADD_DECK_TO_CATEGORY, REMOVE_DECK_FROM_CATEGORY,
} from "../actions/types";
import { combineReducers } from "redux";

function decks(store = {}, action) {
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
        [action.card.deck_id]: {
          ...store[action.card.deck_id],
          "questions": store[action.card.deck_id].questions.concat([action.card])
        }
      };
    case REMOVE_CARD:
      return {
        ...store,
        [action.deckTitle]: {
          ...store[action.deckTitle],
          "questions": store[action.deckTitle].questions.filter(card => card.card_id !== action.card_id),
        },
      };
    case EDIT_CARD:
      return {
        ...store,
        [action.card.deck_id]: {
          ...store[action.card.deck_id],
          questions: store[action.card.deck_id].questions.filter((card) => card.card_id !== action.card.card_id).concat([action.card])
        }
      }
    case ADD_DECK_TO_CATEGORY:
      return {
        ...store,
        [action.title]: {
          ...store[action.title],
          category: action.category
        }
      }
    case REMOVE_DECK_FROM_CATEGORY:
      return {
        ...store,
        [action.title]: {
          ...store[action.title],
          category: null
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

function loading(store = true, action) {
  // loading icon not currently included as it is unnecessary (just get a brief flash)
  switch (action.type) {
    case START_LOADING:
      return true;
    case END_LOADING:
      return false;
    default:
      return store;
  }
}

function categories(store = {}, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...store,
        ...action.categories,
      };
    case ADD_CATEGORY:
      return {
        ...store,
        [action.id]: new Set(),
      };
    case REMOVE_CATEGORY:
      let newStore = {
        ...store
      };
      newStore[action.category].forEach((title) => newStore["Uncategorized"].add(title));
      // move decks to uncategorized
      delete newStore[action.category];
      // delete the category

      return {
        ...newStore,
      };
    case ADD_DECK:
      let newSet;
      if (store[action.category] === undefined || store[action.category].size === 0) {
        newSet = new Set([action.deck.title]);
      } else {
        newSet = new Set(store[action.category]).add(action.deck.title);
      }
      return {
        ...store,
        [action.category]: newSet,
      };
    case REMOVE_DECK:
      return {
        ...store,
        [action.category]: action.newCategory
      };
    case ADD_DECK_TO_CATEGORY:
      return {
        ...action.newCategories,
      };
    case REMOVE_DECK_FROM_CATEGORY:
      return {
        ...store,
        [action.category]: action.newCategory,
      };
    default:
      return store;
  }
}

export default combineReducers({
  decks,
  activeDeck,
  activeCard,
  categories,
  // loading icon not currently included as it is unnecessary (just get a brief flash)
});
