export function validateInputLength(text) {
  return (text.length > 0); //max length is handled by the text input components directly
}

export function validateUniqueDeckName(text, deckNames) {
  return deckNames.includes(text);
}

export function validateUniqueCard(question, answer, questions){
  return questions.some((card) => card.question === question && card.answer === answer);
}

export const getName = (fn) => { // get function name for error logging
  // source: http://jsfiddle.net/ncays/ and
  // https://stackoverflow.com/questions/1013239/can-i-get-the-name-of-the-currently-running-function-in-javascript
  return fn.toString();
}

export const logResponse = (func, res) => {
  return console.log(getName(func), JSON.stringify(res));
}

export const getCurrentTimeString = () => {
  return Date.now().toString();
}
