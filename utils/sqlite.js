import { SQLite } from "expo";
import { decks } from "./_data";
import * as Queries from "./queries";
import { getCurrentTimeString } from "./helpers";

const db = SQLite.openDatabase("mobile_flaschards"); // create a DB if none exists and otherwise open it

const logResponse = (trans, response) => console.log("transaction:", trans, "\nresponse:", response);
const errorHandler = (trans, error) => logResponse(trans, error);

export function populateInitialData() {
  // initialize tables
  createDecksTable();
  createCardsTable();
  createDeckScores();
  // create decks and their cards
  Object.keys(decks).forEach((name) => {
    createDeck(name, errorHandler);
    console.log("deck:", decks[name]);
    decks[name].questions.forEach((card) => {
      createCard(name, card.question, card.answer, errorHandler);
    });
  });
}

export function dropAllTables() {
  db.transaction(tx => {
    tx.executeSql(Queries.dropDeckScores, [], errorHandler, errorHandler);
    tx.executeSql(Queries.dropCards, [], errorHandler, errorHandler);
    tx.executeSql(Queries.dropDecks, [], errorHandler, errorHandler);
  });
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

export function createDeck(title, onSuccess, onError = errorHandler) {
  let created = getCurrentTimeString();
  db.transaction(tx => {
    tx.executeSql(
      Queries.createDeck, [title, created],
      onSuccess, onError
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
      Queries.updateDeckTitle, [newTitle, title], // theoretically, on UPDATE CASCADE should update
      onSuccess, onError                          // the foreign key automatically
    );
  });
}

export function createCardsTable() {
  db.transaction(tx => {
    tx.executeSql(Queries.createCards, [],
      (transaction, result) => logResponse(this, result), // success func
      (transaction, error) => logResponse(this, error)
    );
  });
}

export function createCard(deck_id, question, answer, onSuccess, onError = errorHandler) {
  db.transaction(tx => {
    tx.executeSql(Queries.createCard, [deck_id, question, answer],
      onSuccess, onError
    );
  });
}

export function getAllCards(onSuccess, onError = errorHandler) {
  db.transaction(tx => {
    tx.executeSql(Queries.getAllCards, [], onSuccess, onError)
  });
}

export function getCardsFromDeck(deck_id, onSuccess, onError = errorHandler) {
  db.transaction(tx => {
    tx.executeSql(Queries.getCardsFromDeck, [deck_id],
      onSuccess, onError
    );
  });
}

export function removeCard(deck_id, question, answer, onSuccess, onError = errorHandler) {
  db.transaction(tx => {
    tx.executeSql(Queries.removeCard, [deck_id, question, answer],
      onSuccess, onError
    );
  });
}

export function removeAllCardsFromDeck(deck_id, onSuccess = errorHandler, onError = errorHandler) {
  db.transaction(tx => {
    tx.executeSql(Queries.removeAllCardsFromDeck, [deck_id],
      onSuccess, onError
    );
  });
}

export function updateCard(newQuestion, newAnswer, deck_id, question, answer, onSuccess, onError = errorHandler) {
  db.transaction(tx => {
    tx.executeSql(Queries.updateCard, [newQuestion, newAnswer, deck_id, question, answer],
      onSuccess, onError
    );
  });
}

export function createDeckScores() {
  db.transaction(tx => {
    tx.executeSql(Queries.createDeckScores, [],
      (transaction, result) => logResponse(this, result), // success func
      (transaction, error) => logResponse(this, error)
    );
  });
}

export function recordScore(deck_id, score, onSuccess = errorHandler, onError = errorHandler) {
  let time = getCurrentTimeString();
  db.transaction(tx => {
    tx.executeSql(Queries.recordDeckScore, [deck_id, time, score],
      onSuccess, onError
    );
    tx.executeSql(
      Queries.updateLastTest, [time, score, deck_id],
        onSuccess, onError
    );
  });
}

export function getAllScores(onSuccess, onError = errorHandler) {
  db.transaction(tx => {
    tx.executeSql(Queries.getAllDeckScores, [],
      onSuccess,
      (transaction, error) => logResponse(this, error)
    );
  });
}

export function getAllScoresFromDeck(deck_id, onSuccess, onError = errorHandler) {
  db.transaction(tx => {
    tx.executeSql(Queries.getAllScoresFromDeck, [deck_id],
      onSuccess, onError
    );
  });
}

export function removeAllScoresFromDeck(deck_id, onSuccess, onError = errorHandler) {
  db.transaction(tx => {
    tx.executeSql(Queries.removeAllScoresFromDeck, [deck_id],
      onSuccess, onError
    );
  });
}
