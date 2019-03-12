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
          // builds decks and categories from sql data for redux store
          if (decks[card.title] !== undefined) {
            // primary deck data already in decks - just add the card to the questions arr
            decks[card.title].questions = decks[card.title].questions.concat([{
              question: card.question,
              answer: card.answer,
              card_id: card.card_id,
            }]);
          } else {
            // deck not yet created in decks
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
              // uncategorized deck
              if (categories["Uncategorized"] !== undefined) {
                // uncategorized category already exists in categories
                categories["Uncategorized"].add(title);
              } else {
                // uncategorized category not yet created in categories
                categories["Uncategorized"] = new Set([title]);
              }
            }
            else if (categories[category] !== undefined) {
              // category already exists in categories and category is not null
              categories[category].add(title);
            } else {
              // category does not exist in categories - make new set
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
