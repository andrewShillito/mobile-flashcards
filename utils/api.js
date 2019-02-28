import {
  _getDecks,
  _getDeck,
  _saveDeckTitle,
  _addCardToDeck,
  _removeDeck,
  _setActiveDeck,
  _clearActiveDeck,
  _editDeckTitle,
  _editCard,
  _removeCard,
  _getCategories,
  _addCategory,
  _removeCategory,
  _addDeckToCategory,
  _removeDeckFromCategory,
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

const editCard = function(deckTitle, cardIndex, newCard) {
  return _editCard(deckTitle, cardIndex, newCard);
}

const deleteCard = function(deckTitle, cardIndex) {
  return _removeCard(deckTitle, cardIndex);
}

const addCategory = function(id) {
  return _addCategory(id);
}

const removeCategory = function(id) {
  return _removeCategory(id);
}

const addDeckToCategory = function(category, title) {
  return _addDeckToCategory(category, title);
}

const removeDeckFromCategory = function(category, title) {
  return _removeDeckFromCategory(category, title);
}

const getCategories = function(){
  return _getCategories();
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
  editCard,
  deleteCard,
  getCategories,
  addCategory,
  removeCategory,
  addDeckToCategory,
  removeDeckFromCategory,
}
