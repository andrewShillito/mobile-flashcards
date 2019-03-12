import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, EDIT_TITLE } from "./types";
import { saveDeckTitle, getDeck, getDecks, deleteDeck, editDeckTitle } from "../utils/api";
import { setActiveDeck, clearActiveDeck } from "./activeDeck";
import { startLoading, endLoading } from "./loading";
import { receiveCategories } from "./categories";

import { populateInitialData, getAllCards, getCardsFromDeck } from "../utils/sqlite";

const receiveDecks = (decks) => {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export const handleReceiveDecks = () => {
  return dispatch => { //passed dispatch from redux-thunk middleware
    // dispatch(startLoading()); // not necessary as loading is currently extremely quick

    return populateInitialData() // gets an array of pre-populated decks back from sqlite
      .then(data => {
        // dispatch(endLoading()); // not necessary as laoding is currently extremely quick

        let decks = {};
        let categories = {};
        data.forEach((card) => {
          if (decks[card.title] !== undefined) {
            decks[card.title].questions = decks[card.title].questions.concat([{
              question: card.question,
              answer: card.answer,
              card_id: card.card_id,
            }]);
          } else {
            let { title, category, create_date, last_score, last_tested, card_id, question, answer } = card;
            decks[card.title] = {
              title,
              category,
              create_date,
              last_score,
              last_tested,
              questions: [
                {
                  card_id,
                  question,
                  answer,
                }
              ]
            };
            if (category === null) {
              if (categories["Uncategorized"] !== undefined) {
                categories["Uncategorized"].add(title);
              } else {
                categories["Uncategorized"] = new Set([title]);
              }
            }
            else if (categories[category] !== undefined) {
              categories[category].add(title);
            } else {
              categories[category] = new Set([title]);
            }
          }
        });

        dispatch(receiveDecks(decks));
        dispatch(receiveCategories(categories))
      })
      .catch(err => console.log(err));
  };
}

const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    deck,
  };
}

export const handleAddDeck = (title) => {
  return dispatch => {
    return saveDeckTitle(title)
      .then(deck => {
        dispatch(addDeck(deck));
        dispatch(setActiveDeck(title));
      })
      .catch(err => console.log(err));
  };
}

const removeDeck = (title) => {
  return {
    type: REMOVE_DECK,
    title,
  };
}

export const handleRemoveDeck = (title) => {
  return dispatch => {
    return deleteDeck(title)
      .then(() => {
        dispatch(removeDeck(title));
        dispatch(clearActiveDeck());
      })
      .catch((err) => console.log(err));
  };
}

const editTitle = (oldTitle, newDeck) => {
  return {
    type: EDIT_TITLE,
    oldTitle,
    newDeck,
  };
}

export const handleEditTitle = (oldTitle, newTitle) => {
  return dispatch => {
    return editDeckTitle(oldTitle, newTitle)
      .then((newDeck) => {
        dispatch(setActiveDeck(newDeck.title));
        dispatch(editTitle(oldTitle, newDeck));
      })
      .catch((err) => console.log(err));
  };
}
