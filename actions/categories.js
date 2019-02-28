import { ADD_CATEGORY, REMOVE_CATEGORY, ADD_DECK_TO_CATEGORY, REMOVE_DECK_FROM_CATEGORY, RECEIVE_CATEGORIES } from "./types";
import { addCategory as _addCategory, removeCategory as _removeCategory, addDeckToCategory as _addDeckToCategory, removeDeckFromCategory as _removeDeckFromCategory, getCategories } from "../utils/api";

function receiveCategories(categories) {
  console.log("dispatched:", categories);
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  };
}

function addCategory(id, newSet) {
  return {
    type: ADD_CATEGORY,
    id,
    newSet,
  };
}

function removeCategory(categories) {
  return {
    type: REMOVE_CATEGORY,
    categories,
  };
}

function addDeckToCategory(category, categoryItems) {
  return {
    type: ADD_DECK_TO_CATEGORY,
    categoryItems,
  };
}

function removeDeckFromCategory(category, categoryItems) {
  return {
    type: REMOVE_DECK_FROM_CATEGORY,
    category,
    categoryItems,
  };
}

export function handleReceiveCategories() {
  return dispatch => {
    return getCategories()
      .then((categories) => {
        console.log("received from _data", categories);
        dispatch(receiveCategories(categories));
      })
      .catch((err) => console.log(err));
  }
}

export function handleAddCategory(id) {
  return dispatch => {
    return _addCategory(id)
      .then((newSet) => {
        dispatch(addCategory(id, newSet));
      })
      .catch((err) => console.log(err));
  }
}

export function handleRemoveCategory(id) {
  return dispatch => {
    return _removeCategory(id)
      .then((categories) => {
        dispatch(removeCategory(categories));
      })
      .catch((err) => console.log(err));
  }
}

export function handleAddDeckToCategory(category, title) {
  return dispatch => {
    return _addDeckToCategory(category, title)
      .then((categoryItems) => {
        dispatch(addDeckToCategory(category, categoryItems));
      })
      .catch((err) => console.log(err));
  }
}

export function handleRemoveDeckFromCategory(category, title) {
  return dispatch => {
    return _removeDeckFromCategory(category, title)
      .then((categoryItems) => {
        dispatch(removeDeckFromCategory(category, categoryItems));
      })
      .catch((err) => console.log(err));
  }
}
