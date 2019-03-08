import { SQLite } from "expo";
import { decks } from "./_data";
import * as Queries from "./queries";
import { getSafeTimeISO } from "./helpers";

const db = SQLite.openDatabase("mobile_flaschards"); // create a DB if none exists and otherwise open it

const logResponse = (trans, response) => console.log("\nresponse:", response);
const errorHandler = (trans, error) => console.log("\nerror:", error);

const loggingTx = function(tx, Query, params = []) {
  return tx.executeSql(Query, params,
    (transaction, result) => logResponse(this, result), // success func
    (transaction, error) => errorHandler(this, error))
}

const boundLoggingTx = function(Query, params = []) {
  return this.executeSql(Query, params,
    (transaction, result) => logResponse(this, result), // success func
    (transaction, error) => errorHandler(this, error));
}

const boundNoLogTx = function(Query, params = []) {
  return this.executeSql(Query, params,
    () => {},
    (transaction, error) => errorHandler(this, error));
}

export function populateInitialData(queryList = [
  Queries.dropDeckScores,
  Queries.dropCards,
  Queries.dropDecks,

  Queries.createDecks,
  Queries.createCards,
  Queries.createDeckScores,

  Queries.getDecks,
  Queries.getAllCards,
  Queries.getAllDeckScores
]) {
  return new Promise((res, rej) => db.transaction(tx => {
    const func = boundLoggingTx.bind(tx); // to shorten function call by binding tx to this keyword
    const noLogFunc = boundNoLogTx.bind(tx);

    queryList.forEach((query) => noLogFunc(query));

    Object.keys(decks).forEach((name) => {
      func(Queries.createDeck, [name, getSafeTimeISO()]); // multiple decks will have same creation time due to speed of this
      decks[name].questions.forEach(card => {
        func(Queries.createCard, [getSafeTimeISO(), name, card.question, card.answer]);
      });
    });

    func(Queries.getAllCards);
    tx.executeSql(Queries.getDecks, [],
      (_, { rows }) => res(rows._array),
      (_, error) => rej(error)
    );
  }));
}

export function dropAllTables() {
  db.transaction(tx => {
    tx.executeSql(Queries.dropDeckScores, [], logResponse, errorHandler);
    tx.executeSql(Queries.dropCards, [], logResponse, errorHandler);
    tx.executeSql(Queries.dropDecks, [], logResponse, errorHandler);
  });
}

export function createDecksTable(onSuccess = logResponse, onError = errorHandler) {
  // initializes decks table if none exists
  db.transaction(tx => {
    tx.executeSql(
      Queries.createDecks, [],
      onSuccess,
      onError
    );
    loggingTx(tx, Queries.checkTableCreation, ["decks"]);
  });
}

export function getDecks(onSuccess, onError = errorHandler) {
  // onSuccess will be passed by calling component
  // onError is optional for specific error handling
  // double check the syntax of the parameters
  db.transaction(tx => {
    tx.executeSql(
      Queries.getDecks, [],
      onSuccess,
      onError,
    )
  });
}

export function getDeck(title, onSuccess, onError = errorHandler) {
  db.transaction(tx => {
    tx.executeSql(
      Queries.getDeck, [title],
      onSuccess,
      onError
    );
  });
}

export function createDeck(title, onSuccess, onError = errorHandler) {
  let created = getSafeTimeISO();
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
      onSuccess,
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

export function createCardsTable(onSuccess = logResponse, onError = errorHandler) {
  db.transaction(tx => {
    tx.executeSql(Queries.createCards, [],
      onSuccess,
      onError
    );
    loggingTx(tx, Queries.checkTableCreation, ["cards"]);
  });
}

export function createCard(deck_id, question, answer, onSuccess, onError = errorHandler) {
  let card_id =
  db.transaction(tx => {
    tx.executeSql(Queries.createCard, [card_id, deck_id, question, answer],
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

export function createDeckScores(onSuccess = logResponse, onError = errorHandler) {
  db.transaction(tx => {
    tx.executeSql(Queries.createDeckScores, [],
      onSuccess, // success func
      onError
    );
    loggingTx(tx, Queries.checkTableCreation, ["deck_scores"]);
  });
}

export function recordScore(deck_id, score, onSuccess = errorHandler, onError = errorHandler) {
  let time = getSafeTimeISO();
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
      onError
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
