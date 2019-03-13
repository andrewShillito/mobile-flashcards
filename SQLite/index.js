import Expo, { SQLite } from "expo";
import { decks } from "../utils/_data";
import * as Queries from "./queries";
import { getSafeTimeISO, getCurrentTimeISOString } from "../utils/helpers";

const db = SQLite.openDatabase("mobile_flashcards.db"); // create a DB if none exists and otherwise open it

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

export function checkForExistingTable() {
  // checks if decks exists - existing db
  // returns bool representing that decks exists
  return new Promise((res, rej) => db.transaction(tx => {
    tx.executeSql(Queries.checkForExistingTable, ["decks"],
      (_, { rows }) => res(rows._array.length > 0),
      (_, error) => rej(error)
    );
  }));
}

export function populateInitialData(queryList = [
  Queries.dropDeckScores,
  Queries.dropCards,
  Queries.dropDecks,

  Queries.createDecks,
  Queries.createCards,
  Queries.createDeckScores,

]) {
  return new Promise((res, rej) => db.transaction(tx => {

    const func = boundLoggingTx.bind(tx); // to shorten function call by binding tx to this keyword
    const noLogFunc = boundNoLogTx.bind(tx);

    queryList.forEach((query) => noLogFunc(query));

    Object.keys(decks).forEach((name) => {
      noLogFunc(Queries.createDeck, [name, getSafeTimeISO()]);

      decks[name].questions.forEach(card => {
        let time = getSafeTimeISO()
        noLogFunc(Queries.createCard, [time, name, card.question, card.answer]);

      });
    });

    tx.executeSql(Queries.getDecksAndCards, [],
      (_, { rows }) => res(rows._array),
      (_, error) => rej(error));
  }));
}

export function dropAllTables() {
  return new Promise((res, rej) => db.transaction(tx => {
    tx.executeSql(Queries.dropDeckScores, [], logResponse, errorHandler);
    tx.executeSql(Queries.dropCards, [], logResponse, errorHandler);
    tx.executeSql(Queries.dropDecks, [], logResponse, errorHandler);
    })
  );
}

export function createDecksTable() {
  // initializes decks table if none exists
  return new Promise((res, rej) => db.transaction(tx => {
    tx.executeSql(Queries.createDecks, [],
      (_, { rows }) => {},
      (_, error) => rej(error));
    // tx.executeSql(
    //   Queries.getTableStructure, ["decks"], // checks table creation and returns the sql used to make it
    //   (_, { rows }) => res(rows._array),
    //   (_, error) => rej(error));
    })
  );
}

export function getDecks() {
  return new Promise((res, rej) => db.transaction(tx => {
    tx.executeSql(Queries.getDecks, [],
      (_, { rows }) => res(rows._array),
      (_, error) => rej(error));
    })
  );
}

export function getDecksAndCards() {
  return new Promise((res, rej) => db.transaction(tx => {
    tx.executeSql(Queries.getDecksAndCards, [],
      (_, { rows }) => res(rows._array),
      (_, error) => rej(error));
    })
  );
}

export function getDeck(title) {
  return new Promise((res, rej) => db.transaction(tx => {
    tx.executeSql(Queries.getDeck, [title],
      (_, { rows }) => res(rows._array),
      (_, error) => rej(error));
    })
  );
}

export function createDeck(title, created = getCurrentTimeISOString(), category = null) {
  return new Promise((res, rej) => db.transaction(tx => {
      tx.executeSql(Queries.createDeck, [title, created, category],
        (_, { rows }) => {},
        (_, error) => rej(error)
      );
      tx.executeSql(Queries.getDeck, [title],
        (_, { rows }) => res(rows._array),
        (_, error) => rej(error));
    })
  );
}

export function removeDeck(title) {
  return new Promise((res, rej) => db.transaction(tx => {
    tx.executeSql(Queries.removeDeck, [title], // removes cards relating to deck
      (_, { rows }) => {},
      (_, error) => rej(error));
    tx.executeSql(Queries.removeAllCardsFromDeck, [title], // removes deck from decks table
      (_, { rows }) => res(rows._array),
      (_, error) => rej(error));
    // tx.executeSql("SELECT * FROM cards", [], // if need the new cards list
    //   (_, { rows }) => res(rows._array),
    //   (_, error) => rej(error));
    })
  );
}

export function updateDeckTitle(title, newTitle) {
  return new Promise((res, rej) => db.transaction(tx => {
      tx.executeSql(Queries.updateDeckTitle, [newTitle, title],
        // theoretically, on UPDATE CASCADE should update the cards and deck_scores foreign key automatically
        (_, { rows }) => res(rows._array),
        (_, error) => rej(error));
    })
  );
}

export function createCardsTable() {
  return new Promise((res, rej) => db.transaction(tx => {
    tx.executeSql(Queries.createCards, [],
      (_, { rows }) => res(rows._array),
      (_, error) => rej(error));
    })
  );
}

export function createCard(deck_id, question, answer, card_id = getCurrentTimeISOString()) {
  return new Promise((res, rej) => db.transaction(tx => {
    tx.executeSql(Queries.createCard, [card_id, deck_id, question, answer],
      (_, { rows }) => res(rows._array),
      (_, error) => rej(error));
    })
  );
}

export function getAllCards() {
  return new Promise((res, rej) => db.transaction(tx => {
      tx.executeSql(Queries.getAllCards, [],
        (_, { rows }) => res(rows._array),
        (_, error) => rej(error));
    })
  );
}

export function getCardsFromDeck(deck_id) {
  return new Promise((res, rej) => db.transaction(tx => {
      tx.executeSql(Queries.getCardsFromDeck, [deck_id],
        (_, { rows }) => res(rows._array),
        (_, error) => rej(error));
    })
  );
}

export function removeCard(card_id) {
  return new Promise((res, rej) => db.transaction(tx => {
    tx.executeSql(Queries.removeCard, [card_id],
      (_, { rows }) => res(rows._array),
      (_, error) => rej(error));
    })
  );
}

export function removeAllCardsFromDeck(deck_id) {
  return new Promise((res, rej) => db.transaction(tx => {
    tx.executeSql(Queries.removeAllCardsFromDeck, [deck_id],
      (_, { rows }) => res(rows._array),
      (_, error) => rej(error));
    })
  );
}

export function updateCard(card_id, newQuestion, newAnswer) {
  return new Promise((res, rej) => db.transaction(tx => {
    tx.executeSql(Queries.updateCard, [newQuestion, newAnswer, card_id],
      (_, { rows }) => res(rows._array),
      (_, error) => rej(error));
    })
  );
}

export function createDeckScores() {
  return new Promise((res, rej) => db.transaction(tx => {
    tx.executeSql(Queries.createDeckScores, [],
      (_, { rows }) => res(rows._array),
      (_, error) => rej(error));
    })
  );
}

export function recordScore(deck_id, score, time = getCurrentTimeISOString()) {
  return new Promise((res, rej) => db.transaction(tx => {
    tx.executeSql(Queries.recordDeckScore, [deck_id, time, score],
      (_, { rows }) => {},
      (_, error) => rej(error));
    tx.executeSql(Queries.updateLastTest, [time, score, deck_id],
      (_, { rows }) => res(rows._array),
      (_, error) => rej(error));
    })
  );
}

export function getAllScores() {
  return new Promise((res, rej) => db.transaction(tx => {
    tx.executeSql(Queries.getAllDeckScores, [],
      (_, { rows }) => res(rows._array),
      (_, error) => rej(error)
    );
  }));
}

export function getAllScoresFromDeck(deck_id) {
  return new Promise((res, rej) => db.transaction(tx => {
    tx.executeSql(Queries.getAllScoresFromDeck, [deck_id],
      (_, { rows }) => res(rows._array),
      (_, error) => rej(error));
    })
  );
}

export function removeAllScoresFromDeck(deck_id) {
  return new Promise((res, rej) => db.transaction(tx => {
    tx.executeSql(Queries.removeAllScoresFromDeck, [deck_id],
      (_, { rows }) => res(rows._array),
      (_, error) => rej(error));
    })
  );
}
