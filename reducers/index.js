import {
  RECEIVE_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD,
  REMOVE_CARD,
} from "../actions/types";

export default function decks(store = {}, action) {
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
      const newState = {
        ...store,
      };
      delete newState[action.title];
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
