export const createDecks = "create table if not exists decks" +
([
  "(title varchar(100) primary key not null",
  "create_date varchar(100) not null",
  "last_edit_date varchar(100) not null",
  "category varchar(100))"
].join(", "));

export const getDecks = "SELECT * FROM decks";
