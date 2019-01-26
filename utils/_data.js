import { AsyncStorage } from "react-native";

const DECKS_STORAGE_KEY = "mobileFlashcards:decks"

let decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

let activeDeck = null;

const formatDeck = function(title) {
  return {
    title,
    questions: [],
  };
}

const _resetAsyncStorage = function() { //for development purposes - resets AsyncStorage to dummy data
  return AsyncStorage.removeItem(DECKS_STORAGE_KEY)
    .then(AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks)))
}

const _getDecks = function() {
  // return _resetAsyncStorage() //for development purposes
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      if ( data === null) {
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
        // first time running app - set async storage with dummy data
      } else {
        console.log("asyncStorage data:", data);
        decks = data; // replace decks dummy data with decks data in asyncStorage -
        // don't need this after build out of asyncStorage logic
      }
      return {...data};
    })
    .catch(err => console.log(err));
}

const _getDeck = function(id) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      decks[id] !== undefined
        ? res({...decks[id]})
        : rej(Error("Deck not found"));
    }, 500);
  });
}

const _saveDeckTitle = function(title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data[title] === undefined) {
        let newDeck = formatDeck(title);
        data[title] = newDeck;
        return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
          .then(() => {
            return data[title];
          })
          .catch((error) => console.log(error));
      }
      return Error("That deck name is already in use");
    })
    .catch((error) => console.log(error));
}

const _editDeckTitle = function(oldTitle, newTitle) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (decks[oldTitle] === undefined) {
        rej(Error("Deck not found"));
      }
      decks[newTitle] = {
        ...decks[oldTitle],
        title: newTitle,
      };

      delete decks[oldTitle];
      res(decks[newTitle]);
    });
  });
}

const _addCardToDeck = function(deckTitle, card) { //card must be formatted on front end
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (decks[deckTitle] !== undefined) {
        let newQuestions = decks[deckTitle].questions.concat([card]);
        decks[deckTitle] = {
            ...decks[deckTitle],
            "questions": decks[deckTitle].questions.length ? decks[deckTitle].questions.concat([card]) : [card],
          };
        res(decks[deckTitle]);
      }
      else {
        rej(Error("Deck not found"));
      }
    }, 500);
  });
}

const _removeDeck = function(title) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      decks[title] !== undefined
        ? rej(Error("Deck not found"))
        : decks = {...decks},
          delete decks[title],
          res({...decks});
    }, 500)
  });
}

const _setActiveDeck = function(title) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (title !== "" && title in decks) {
        activeDeck = title;
        res(decks[title]);
      }
      else {
        rej(Error("Invalid deck name"));
      }
    }, 200)
  });
}

const _clearActiveDeck = function() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      activeDeck = null;
      res();
    }, 200)
  });
}

export {
  _getDecks,
  _getDeck,
  _saveDeckTitle,
  _addCardToDeck,
  _removeDeck,
  _editDeckTitle,
};
