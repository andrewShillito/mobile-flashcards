import { ADD_CATEGORY, REMOVE_CATEGORY, ADD_DECK_TO_CATEGORY, REMOVE_DECK_FROM_CATEGORY, RECEIVE_CATEGORIES } from "./types";
import { setDeckCategory, clearDeckCategory } from "../SQLite";

export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  };
}

export function addCategory(id) {
  return {
    type: ADD_CATEGORY,
    id,
  };
}

export function removeCategory(category) {
  return {
    type: REMOVE_CATEGORY,
    category,
  };
}

export function addDeckToCategory(category, title, newCategories) {
  return {
    type: ADD_DECK_TO_CATEGORY,
    category,
    title,
    newCategories,
  };
}

export function removeDeckFromCategory(title, newCategory) {
  return {
    type: REMOVE_DECK_FROM_CATEGORY,
    newCategory,
    title,
  };
}

export function handleAddDeckToCategory(category, title) {
  return dispatch => {
    return setDeckCategory()
      .then(categories => { // categories is [{ category: category, title: title }, etc...]
        let newCategories = {};
        categories.forEach((obj) => {
          if (newCategories[obj.category] === undefined) {
            newCategories[obj.category] = new Set(obj.title);
          } else {
            newCategories[obj.category].add(obj.title);
          }
        });
        console.log("parsed sql categories:", newCategories);
        dispatch(addDeckToCategory(decksFromCategory(category, title, newCategories)));
      })
      .catch(err => console.log(err));
  };
}

export function handleClearDeckCategory(title) {
  return dispatch => {
    return clearDeckCategory()
      .then(deckTitles => { // arr of decks in the altered category
        dispatch(removeDeckFromCategory(title, new Set(deckTitles)));
      })
      .catch(err => console.log(err));
  };
}

// Deprecated AsyncStorage methods

// export function handleReceiveCategories() {
//   return dispatch => {
//     return getCategories()
//       .then((categories) => {
//         dispatch(receiveCategories(categories));
//       })
//       .catch((err) => console.log(err));
//   }
// }
//
// export function handleAddCategory(id) {
//   return dispatch => {
//     return _addCategory(id)
//       .then((newSet) => {
//         dispatch(addCategory(id, newSet));
//       })
//       .catch((err) => console.log(err));
//   }
// }
//
// export function handleRemoveCategory(id) {
//   return dispatch => {
//     return _removeCategory(id)
//       .then((categories) => {
//         dispatch(removeCategory(categories));
//       })
//       .catch((err) => console.log(err));
//   }
// }
//
// export function handleAddDeckToCategory(category, title) {
//   return dispatch => {
//     return _addDeckToCategory(category, title)
//       .then((categoryItems) => {
//         dispatch(addDeckToCategory(category, categoryItems));
//       })
//       .catch((err) => console.log(err));
//   }
// }
//
// export function handleRemoveDeckFromCategory(category, title) {
//   return dispatch => {
//     return _removeDeckFromCategory(category, title)
//       .then((categoryItems) => {
//         dispatch(removeDeckFromCategory(category, categoryItems));
//       })
//       .catch((err) => console.log(err));
//   }
// }
