export const createDecks = "create table if not exists decks" +
([
  "(title TEXT primary key not null",
  "create_date TEXT not null",
  "last_edit_date TEXT not null",
  "category TEXT)"
].join(", "))+;

export const getDecks = "SELECT * FROM decks";

export const getDeck = "SELECT * FROM decks WHERE title=?";

export const createCardTable = "CREATE TABLE IF NOT EXISTS ?" +
([
  "(card_id INTEGER PRIMARY KEY NOT NULL auto_increment",
  "question TEXT NOT NULL",
  "answer TEXT NOT NULL"
]).join(", ");

export const createCard = "INSERT INTO ? (question, answer) VALUES (?, ?)"
