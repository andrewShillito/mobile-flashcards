import {
  _getDecks,
  _getDeck,
  _saveDeckTitle,
  _addCardToDeck,
  _removeDeck,
  _setActiveDeck,
  _clearActiveDeck,
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

const setActiveDeck = function(title) {
  return _setActiveDeck(title);
}

const clearActiveDeck = function() {
  return _clearActiveDeck();
}

export {
  getDecks,
  getDeck,
  saveDeckTitle,
  addCardToDeck,
  deleteDeck,
  setActiveDeck,
  clearActiveDeck,
}
