let decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

const formatDeck = function(title) {
  return {
    [title]: {
      title,
      questions: [],
    },
  };
}

const _getDecks = function() {
  return new Promise((res, rej) => {
    setTimeout(() => res({...decks}), 1000);
  });
}

const _getDeck = function(id) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      decks[id] !== undefined
        ? res({...decks[id]})
        : rej(Error("Deck not found"));
    }, 500);
  });
}

const _saveDeckTitle = function(title) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      decks[title] !== undefined
        ? rej(Error("That deck name is already in use"))
        : decks[title] = formatDeck(title), res(decks[title]);
    }, 500);
  });
}

const _addCardToDeck(title, card) {
  return new Promise((res, rej) => {
    decks[title] !== undefined
      ? decks[title] = {
          ...decks[title],
          "questions": decks[title].questions.concat([card]),
        }
      : rej(Error("Deck not found"));
  });
}

export {
  _getDecks,
  _getDeck,
  _saveDeckTitle,
  _addCardToDeck,
};
