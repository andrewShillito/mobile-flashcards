import { SQLite } from "expo";
import { decks } from "./_data";
import * as Queries from "./queries";
import { logResponse } from "./helpers";

const db = SQLite.openDatabase("mobile_flaschards"); // create a DB if none exists and otherwise open it

export function populateInitialData(decks) {

}

export function createDecks() {
  db.transaction(tx => {
    tx.executeSql(
      Queries.createDecks, [],
      (transaction, result) => logResponse(this, result), // success func
      (transaction, error) => logResponse(this, error)
    )
  });
}

export function getDecks(onSuccess, onError = (trans, error) => logResponse(trans, error)) {
  // onSuccess will be passed by calling component
  // onError is optional for specific error handling
  // double check this syntax
  db.transaction(tx => {
    tx.executeSql(
      Queries.getDecks, [],
      (trans, res) => onSuccess(trans, res),
      onError,
      )
    )
  });
}
