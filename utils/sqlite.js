import { SQLite } from "expo";
import { decks } from "./_data";
import * as Queries from "./queries";
import { logResponse } from "./helpers";

const db = SQLite.openDatabase("mobile_flaschards"); // create a DB if none exists and otherwise open it

const errorHandler = (trans, error) => logResponse(trans, error);

export function populateInitialData(decks) {

}

export function createDecksTable() {
  // initializes decks table if none exists
  db.transaction(tx => {
    tx.executeSql(
      Queries.createDecks, [],
      (transaction, result) => logResponse(this, result), // success func
      (transaction, error) => logResponse(this, error)
    );
  });
}

export function getDecks(onSuccess, onError = errorHandler) {
  // onSuccess will be passed by calling component
  // onError is optional for specific error handling
  // double check the syntax of the parameters
  db.transaction(tx => {
    tx.executeSql(
      Queries.getDecks, [],
      (trans, res) => onSuccess(trans, res),
      onError,
    )
  });
}

export function getDeck(title, onSuccess, onError = errorHandler) {
  db.transaction(tx => {
    tx.executeSql(
      Queries.getDeck, [title],
      (trans, res) => onSuccess(trans, res),
      onError
    );
  });
}

export function removeDeck(title, onSuccess, onError = errorHandler) {
  db.transaction(tx => {
    tx.executeSql(
      Queries.removeDeck, [title],
      onSuccess, onError
    );
    tx.executeSql(
      Queries.removeDeckQuestions, [title],
      (trans, res) => logResponse(trans, res),
      onError
    );
  });
}

export function updateDeckTitle(title, newTitle, onSuccess, onError = errorHandler) {
  db.transaction(tx => {
    tx.executeSql(
      Queries.updateDeckTitle, [newTitle, title],
      onSuccess, onError
    );
    tx.executeSql(
      Queries.renameTable, [title, newTitle],
      (trans, res) => logResponse(trans, resets),
      onError
    );
  });
}

export function createCard(title, { question, answer }, onSuccess, onError = errorHandler) {
  // title will be the active deck
  // will be called when creating first card
  // card format: {question: "blah", answer: "blah"}
  // checks if table for that deck exists and if not creates that table
  // then creates the card row in that table
  db.transaction(tx => {
    tx.executeSql(
      Queries.createCardTable, [title],
      (trans, res) => logResponse(trans, res), onError // just logging the result of this if successful
    );
    tx.executeSql(
      Queries.createCard, [title, question, answer],
      onSuccess, onError
    );
  });
}

export function removeCard(title, card_id, onSuccess, onError = errorHandler) {
  // what will the sql indexing look like? (start at 0 or 1?)
  // may be able to just use the id ()
}
