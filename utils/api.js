import {
  _getDecks,
  _getDeck,
  _saveDeckTitle,
  _addCardToDeck,
  _removeDeck,
} from "./_data";

const getDecks = function() {
  return _getDecks();
}

const getDeck = function(title) {
  return _getDeck(title);
}

const saveDeckTitle = function(title) {
  return _saveDeckTitle(title);
}

const addCardToDeck = function(title, card) { // card must be formatted on front end
  return _addCardToDeck(title, card);
}

const deleteDeck = function(title) {
  return _removeDeck(title);
}

export {
  getDecks,
  getDeck,
  saveDeckTitle,
  addCardToDeck,
  deleteDeck,
}
