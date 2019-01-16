import {
  _getDecks,
  _getDeck,
  _saveDeckTitle,
  _addCardToDeck,
} from "./_data";

const getDecks = function() {
  return _getDecks();
}

const getDeck = function(id) {
  return _getDeck(id);
}

const saveDeckTitle = function(title) {
  return _saveDeckTitle(title);
}

const addCardToDeck = function(title, card) {
  return _addCardToDeck(title, card);
}

export {
  getDecks,
  getDeck,
  saveDeckTitle,
  addCardToDeck,
}
