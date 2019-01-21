import {
  _getDecks,
  _getDeck,
  _saveDeckTitle,
  _addCardToDeck,
  _removeDeck,
  _setActiveDeck,
  _clearActiveDeck,
  _editDeckTitle,
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

const addCardToDeck = function(deckTitle, card) { // card must be formatted on front end
  return _addCardToDeck(deckTitle, card);
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

const editDeckTitle = function(oldTitle, newTitle) {
  return _editDeckTitle(oldTitle, newTitle);
}

export {
  getDecks,
  getDeck,
  saveDeckTitle,
  addCardToDeck,
  deleteDeck,
  setActiveDeck,
  clearActiveDeck,
  editDeckTitle,
}
