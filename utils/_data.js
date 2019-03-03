import { AsyncStorage } from "react-native";

const DECKS_STORAGE_KEY = "mobileFlashcards:decks";
const CATEGORIES_STORAGE_KEY = "mobileFlashcards:categories";

// deprecated - just for store structure reference
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
    ],
    category: null,
    createDate: "",
    last_tested: "",
    last_score: "",
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ],
    category: null,
    createDate: "",
    last_tested: "",
    last_score: "",
  }
}

let activeDeck = null; // for reference of redux store prop - will not be stored in AsyncStorage

let activeCard = { // for reference of redux store prop - will not be stored in AsyncStorage
  question: "",
  answer: "",
  deck: "",
  index: null,
};

// deprecated - just for store structure reference
let categories = {
  programming: [
    "JavaScript",
    "React"
  ],
};

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
      if (data === null) {
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
        // first time running app - set async storage with dummy data
        return {...decks}; //return dummy data as async storage is set
      }
      return {...data};
    })
    .catch(err => console.log(err));
}

const _getDeck = function(id) { //id is the deck title
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data[id] === undefined) {
        return Error("Deck not found");
      }
      return {...data[id]};
    })
    .catch((error) => console.log(error));
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
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data[oldTitle] === undefined) {
        return Error("Deck not found");
      }
      data[newTitle] = {
        ...data[oldTitle],
        title: newTitle,
      };
      data[oldTitle] = undefined; // potentially unnecessary
      delete data[oldTitle];
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        .catch((error) => console.log(error));
      return data[newTitle];
    })
    .catch((error) => console.log(error));
}

const _addCardToDeck = function(deckTitle, card) { //card must be formatted on front end
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data[deckTitle] === undefined) {
        return Error("Deck not found");
      }
      let newQuestions = data[deckTitle].questions.concat([card]);
      data[deckTitle] = {
        ...data[deckTitle],
        "questions": newQuestions,
      };
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        .catch((error) => console.log(error));
      return data[deckTitle];
    })
    .catch((error) => console.log(error));
}

const _editCard = function(deckTitle, cardIndex, newCard) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data[deckTitle] === undefined) {
        return Error("Deck not found");
      }
      data[deckTitle].questions.splice(cardIndex, 1, newCard);
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        .catch((error) => console.log(error));
      return data[deckTitle];
    })
    .catch((error) => console.log(error));
}

const _removeCard = function(deckTitle, cardIndex) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data[deckTitle] === undefined) {
        return Error("Deck not found");
      } else if (cardIndex >= data[deckTitle].questions.length) {
        return Error("Card Index out of range");
      }
      let newQuestions = data[deckTitle].questions.filter((card, index) => index !== cardIndex);
      data[deckTitle] = {
        ...data[deckTitle],
        "questions": newQuestions,
      };
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        .catch((error) => console.log(error));
      return data[deckTitle];
    })
    .catch((error) => console.log(error));
}

const _removeDeck = function(title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data[title] === undefined) {
        return Error("Deck not found");
      }
      delete data[title];
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        .catch((error) => console.log(error));
      return {...data};
    })
    .catch((error) => console.log(error));
}

const _setActiveDeck = function(title) {
  // deprecated - activeDeck only stored in redux for app state
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (title !== "" && title in data){
        activeDeck = title;
        return data[title];
      }
      return Error("Invalid deck name");
    })
    .catch((error) => console.log(error));
}

const _clearActiveDeck = function() {
  // deprecated - activeDeck only stored in redux for app state
  return new Promise((res, rej) => {
    setTimeout(() => {
      activeDeck = null;
      res();
    }, 200)
  });
}

const _getCategories = function() {
  return AsyncStorage.getItem(CATEGORIES_STORAGE_KEY)
    .then((raw) => {console.log("Raw Return", raw); return raw})
    .then(JSON.parse)
    .then((data) => {
      console.log("received from AsyncStorage:", data)
      if (data === null) {
        AsyncStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories))
          .then(() => {
            return {...categories}
          })
          .catch((err) => console.log(err));
      } else {
        console.log("data return statement", {...data});
        return {...categories}; // change to {...data} when not returning dummy data
      }
    })
    .catch((err) => console.log(err));
}

const _addCategory = function(id) {
  return AsyncStorage.getItem(CATEGORIES_STORAGE_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data[id] !== undefined) {
        return Error("Category already exists");
      } else {
        data[id] = new Set();
        return AsyncStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(data))
          .then(() => {
            return data[id];
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
}

const _removeCategory = function(id) {
  return AsyncStorage.getItem(CATEGORIES_STORAGE_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data[id] === undefined) {
        return Error("Category not found");
      } else {
        delete data[id];
        AsyncStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(data))
          .catch((err) => console.log(err, "\ndata:\n", data));
        return {...data};
      }
    })
    .catch((err) => console.log(err));
}

const _addDeckToCategory = function(category, title) {
  return AsyncStorage.getItem(CATEGORIES_STORAGE_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data[id] === undefined) {
        return Error("Category not found");
      } else if (data[id].has(title)) {
        return; // handle this in actions
      } else {
        data[id].add(title);
        AsyncStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(data))
          .then(() => {
            return data[id];
          })
          .catch((err) => console.log(err, "\ndata:\n", data));
      }
    })
    .catch((err) => console.log(err));
}

const _removeDeckFromCategory = function(category, title) {
  return AsyncStorage.getItem(CATEGORIES_STORAGE_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data[id] === undefined) {
        return Error("Category not found");
      } else if (!data[id].has(title)) {
        return Error("Deck not in category");
      } else {
        data[id].delete(title);
        return AsyncStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(data))
          .then(() => {
            return data[id];
          })
          .catch((err) => console.log(err, "\ndata:\n", data));
      }
    })
    .catch((err) => console.log(err));
}

export {
  _getDecks,
  _getDeck,
  _saveDeckTitle,
  _addCardToDeck,
  _removeDeck,
  _editDeckTitle,
  _editCard,
  _removeCard,
  _getCategories,
  _addCategory,
  _removeCategory,
  _addDeckToCategory,
  _removeDeckFromCategory,
};
