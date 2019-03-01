export const createDecks = "create table if not exists decks" +
([
  "(title TEXT PRIMARY KEY NOT NULL",
  "category TEXT",
  "create_date TEXT NOT NULL",
  "last_tested TEXT",
  "last_accessed TEXT NOT NULL)"
].join(", "))+;

export const getDecks = "SELECT * FROM decks";

export const getDeck = "SELECT * FROM decks WHERE title=?";

export const createDeck = "INSERT INTO decks (title, last_accessed) VALUES (?, ?)";

export const removeDeck = "DELETE FROM decks WHERE title=?";

export const removeDeckQuestions = "DROP TABLE IF EXISTS ?";

export const updateDeckTitle = "UPDATE decks SET title=? WHERE title=?";

export const renameTable = "ALTER TABLE ? RENAME TO ?";

export const createCardTable = "CREATE TABLE IF NOT EXISTS ?" +
([
  "(card_id INTEGER PRIMARY KEY NOT NULL auto_increment",
  "question TEXT NOT NULL",
  "answer TEXT NOT NULL"
]).join(", ");

export const createCard = "INSERT INTO ? (question, answer) VALUES (?, ?)"
