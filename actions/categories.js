import { ADD_CATEGORY, REMOVE_CATEGORY, ADD_DECK_TO_CATEGORY, REMOVE_DECK_FROM_CATEGORY, RECEIVE_CATEGORIES } from "./types";
import { addCategory, removeCategory, addDeckToCategory, removeDeckFromCategory, getCategories } from "../utils/api";

function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  };
}

function createCategory(newSet) {
  return {
    type: ADD_CATEGORY,
    newSet,
  };
}

function deleteCategory(id) {
  return {
    type: REMOVE_CATEGORY,
    id,
  };
}

export function handleReceiveCategories() {
  return dispatch => {
    return getCategories()
      .then((categories) => {
        dispatch(receiveCategories(categories));
      })
      .catch((err) => console.log(err));
  }
}

export function handleAddCategory(id) {
  return dispatch => {
    return addCategory(id)
      .then((newSet) => {
        dispatch(createCategory(newSet));
      })
      .catch((err) => console.log(err));
  }
}

export function handleRemoveCategory(id) {
  return dispatch => {
    return removeCategory(id)
      .then((categories) => {
        dispatch(deleteCategory(id));
      })
      .catch((err) => console.log(err));
  }
}
