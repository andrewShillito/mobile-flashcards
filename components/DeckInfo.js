import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

function DeckInfo(props) {
  let numCards = props.deck ? props.deck.questions.length : "";
  let message = numCards
    ? numCards === 0 || numCards > 1 ? "cards" : "card"
    : ""
  return (
    <View style={{alignItems: "center", marginTop: 10}}>
      <Text style={{fontSize: 30}}>{`${numCards} ${message}`}</Text>
    </View>
  );
}

function mapStateToProps({ decks }, { title }) {
  return {
    deck: title ? decks[title] : undefined,
  };
}

export default connect(mapStateToProps)(DeckInfo);
