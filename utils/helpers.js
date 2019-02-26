export function validateInputLength(text) {
  return (text.length > 0); //max length is handled by the text input components directly
}

export function validateUniqueDeckName(text, deckNames) {
  return deckNames.includes(text);
}

export function validateUniqueCard(question, answer, questions){
  return questions.some((card) => card.question === question && card.answer === answer);
}
