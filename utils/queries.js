
// DECKS QUERIES
export const createDecks = "create table if not exists decks " + "(" + ([
  "title TEXT PRIMARY KEY NOT NULL",
  "category TEXT", // category name or null
  "create_date TEXT NOT NULL", // date text
  "last_tested TEXT", // date text or null - will contain same value as deckScores related date
  "last_score REAL", // real number or null
].join(", ")) + ")";

export const getDecks = "SELECT * FROM decks";

export const getDeck = "SELECT * FROM decks WHERE title=?";

export const createDeck = "INSERT INTO decks (title, create_date) VALUES (?, ?)";

export const removeDeck = "DELETE FROM decks WHERE title=?";

export const removeDeckQuestions = "DROP TABLE IF EXISTS ?";

export const updateDeckTitle = "UPDATE decks SET title=? WHERE title=?";

export const updateLastTest = "UPDATE decks SET last_tested=?, last_score=? WHERE title=?";

export const dropDecks = "DROP TABLE decks";

// CARDS QUERIES

// each card is stored in a table with all other cards and foreign key === deck name
export const createCards = "CREATE TABLE IF NOT EXISTS cards " + "(" + ([
  "card_id TEXT PRIMARY KEY", // will be a date string
  "deck_id TEXT NOT NULL",
  "question TEXT NOT NULL",
  "answer TEXT NOT NULL",
  "FOREIGN KEY (deck_id) REFERENCES decks(title) ON UPDATE CASCADE ON DELETE CASCADE"
]).join(", ") + ")";

export const createCard = "INSERT INTO cards (deck_id, question, answer) VALUES (?, ?, ?)";

export const getAllCards = "SELECT * FROM cards";

export const getCardsFromDeck = "SELECT * FROM cards WHERE deck_id=?";

export const removeCard = "DELETE FROM cards WHERE deck_id=?, question=?, answer=?";
// in future may just use index (card_id) which could be easier query - refactor later

export const removeAllCardsFromDeck = "DELETE FROM cards WHERE deck_id=?";

export const updateCard = "UPDATE cards SET question=?, answer=? WHERE deck_id=?, question=?, answer=?";
// lots of params, think about how to shorten the necessary params for func call

export const dropCards = "DROP TABLE cards";

// DECK SCORES QUERIES
export const createDeckScores = "CREATE TABLE IF NOT EXISTS deck_scores " + "(" + ([
  "time TEXT NOT NULL PRIMARY KEY", // date string
  "deck_id TEXT NOT NULL",
  "score REAL NOT NULL",
  "FOREIGN KEY (deck_id) REFERENCES decks(title) ON UPDATE CASCADE ON DELETE CASCADE"
]).join(", ") + ")";

export const recordDeckScore = "INSERT INTO deck_scores (deck_id, time, score) VALUES (?, ?, ?)";

export const getAllDeckScores = "SELECT * FROM deck_scores";

export const getAllScoresFromDeck = "SELECT * FROM deck_scores WHERE deck_id=?";

export const removeAllScoresFromDeck = "DELETE FROM deck_scores WHERE deck_id=?";

export const dropDeckScores = "DROP TABLE deck_scores";

// MISC QUERIES
export const renameTable = "ALTER TABLE ? RENAME TO ?";

export const checkTableCreation = "SELECT sql FROM sqlite_master WHERE name=?";

// CARD SCORES QUERIES - future feature - not currently implementing
export const createCardScores = "CREATE TABLE IF NOT EXISTS card_scores " + "(" +([
  "score_id INTEGER NOT NULL AUTO_INCREMENT",
  "time TEXT NOT NULL PRIMARY KEY",
  "card_id NOT NULL",
  "score INTEGER NOT NULL",
  "FOREIGN KEY (card_id) REFERENCES cards(card_id) ON UPDATE CASCADE ON DELETE CASCADE"
].join(", ")) + ")";
