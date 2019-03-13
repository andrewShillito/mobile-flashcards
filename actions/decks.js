import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, EDIT_TITLE } from "./types";
import { setActiveDeck, clearActiveDeck } from "./activeDeck";
import { startLoading, endLoading } from "./loading";
import { receiveCategories, removeDeckFromCategory, addDeckToCategory } from "./categories";
import { populateInitialData, createDeck, getDecksAndCards, checkForExistingTable,
  removeDeck as _removeDeck, updateDeckTitle } from "../SQLite";

const receiveDecks = (decks) => {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export const handleReceiveDecks = () => {
  return dispatch => { //passed dispatch from redux-thunk middleware
    // dispatch(startLoading()); // not necessary as loading is currently extremely quick

    var existingData = false;
    checkForExistingTable() // returns bool representing if decks table exists
      .then((bool) => existingData = bool)
      .catch(err => console.log("Error checking for existing data:", err));

    existingData ? getDecksAndCards() : populateInitialData() // this works apparently
      .then(data => {
        // dispatch(endLoading()); // not necessary as laoding is currently extremely quick
        const [ decks, categories ] = formatDecksAndCards(data);
        // returns [ decks, categories ] formatted for redux store

        dispatch(receiveDecks(decks));
        dispatch(receiveCategories(categories))
      })
    .catch(err => console.log(err));
  }
}

function formatDecksAndCards(data) {
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
        deck_id: card.deck_id
      }]);
    } else {
      // deck not yet created in decks
      let { title, category, create_date, last_score, last_tested, card_id, question, answer, deck_id } = card;
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
            deck_id
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
  return [decks, categories];
}

const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    deck,
  };
}

export const handleAddDeck = (category, title) => {
  return dispatch => {
    return createDeck(title)
      .then(deckArr => {
        let deck = deckArr[0];
        deck.questions = [];
        dispatch(addDeck(deckArr[0]));
        dispatch(setActiveDeck(title));
        dispatch(addDeckToCategory(category, title));
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

export const handleRemoveDeck = (category, title) => {
  return dispatch => {
    return _removeDeck(title)
      .then(() => { // returns empty arr
        dispatch(removeDeck(title));
        dispatch(clearActiveDeck());
        dispatch(removeDeckFromCategory(category, title))
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
    return updateDeckTitle(oldTitle, newTitle)
      .then((rowsArr) => {
        let newDeck = rowsArr[0]; // may be error prone because of hard coding
        dispatch(setActiveDeck(newDeck.title));
        dispatch(editTitle(oldTitle, newDeck));
        dispatch(addDeckToCategory(newDeck.category, newDeck.title));
        dispatch(removeDeckFromCategory(newDeck.category, oldTitle));
      })
      .catch((err) => console.log(err));
  };
}
