# Mobile flashcards
A React Native App for iOS built using expo-cli, react navigation, and redux.

## To Run App

#### Using Yarn
```
git clone https://github.com/andrewShillito/mobile-flashcards
cd mobile-flashcards
yarn
yarn start
```

#### Using npm
```
git clone https://github.com/andrewShillito/mobile-flashcards
cd mobile-flashcards
npm install
npm start
```
Will start an expo server in a new browser tab.  You can then connect to expo via iPhone, Android, or emulator to run app.

## Features

1. Create flashcard decks and cards
2. Edit your deck's title
3. Quiz yourself with your flashcard decks

## Tab Navigator Routes

1. Home - view a list of your flashcard decks and click them to navigate to an individual deck view
2. New - create new decks by inputting an un-used title

## Stack Navigator Routes

1. DeckDetail - View options and basic info (number of cards and title) of selected deck.
2. Quiz - Quiz yourself on your deck choosing correct or incorrect to track your score. Displays a score report when quiz is completed.
3. EditDeck - Change deck title. Additional features in development.
4. AddCard - Add a card to the deck.

*Coming soon - ScoreDetails and EditCards*
