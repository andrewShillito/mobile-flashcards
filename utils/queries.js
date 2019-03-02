export const createDecks = "create table if not exists decks " +
([
  "(title TEXT PRIMARY KEY NOT NULL",
  "category TEXT",
  "create_date TEXT NOT NULL",
  "last_tested TEXT",
  "last_accessed TEXT NOT NULL",
  "last_score REAL)"
].join(", "))+;

export const getDecks = "SELECT * FROM decks";

export const getDeck = "SELECT * FROM decks WHERE title=?";

export const createDeck = "INSERT INTO decks (title, create_date, last_accessed) VALUES (?, ?, ?)";

export const removeDeck = "DELETE FROM decks WHERE title=?";

export const removeDeckQuestions = "DROP TABLE IF EXISTS ?";

export const updateDeckTitle = "UPDATE decks SET title=? WHERE title=?";

export const renameTable = "ALTER TABLE ? RENAME TO ?";

// if each card is stored in a table with all other cards and foreign key === deck name
export const createCards = "CREATE TABLE IF NOT EXISTS cards " + ([
  "(card_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT", // maybe use a date string index (creation)?
  "deck_id TEXT NOT NULL",
  "question TEXT NOT NULL",
  "answer TEXT NOT NULL",
  "FOREIGN KEY (deck_id) REFERENCES decks(title))"
]).join(", ");

export const createCard = "INSERT INTO cards (deck_id, question, answer) VALUES (?, ?, ?)";

export const getAllCards = "SELECT * FROM cards";

export const getCardsFromDeck = "SELECT * FROM cards WHERE deck_id=?";

export const removeCard = "DELETE FROM cards WHERE deck_id=?, question=?, answer=?";
// in future may just use index (card_id) which could be easier query - refactor later

export const removeAllCardsFromDeck = "DELETE FROM cards WHERE deck_id=?";

export const updateCard = "UPDATE cards SET question=?, answer=? WHERE deck_id=?, question=?, answer=?";
// lots of params, think about how to shorten the necessary params for func call

export const createScores = "CREATE TABLE IF NOT EXISTS scores " + ([
  "(score_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT",
  "deck_id TEXT NOT NULL",
  "time TEXT NOT NULL",
  "score REAL NOT NULL",
  "FOREIGN KEY (deck_id) REFERENCES decks(title))"
]).join(", ");

export const recordScore = "INSERT INTO scores (deck_id, time, score) VALUES (?, ?, ?)";

export const getAllScores = "SELECT * FROM scores";

export const getAllScoresFromDeck = "SELECT * FROM scores WHERE deck_id=?";

export const removeAllScoresFromDeck = "DELETE FROM scores WHERE deck_id=?";
