import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

function DeckInfo(props) {
  return (
    <View style={{alignItems: "center"}}>
      <Text style={{fontSize: 30}}>Number of Cards</Text>
      <Text style={{fontSize: 30}}>{props.deck ? props.deck.questions.length : ""}</Text>
    </View>
  );
}

function mapStateToProps({ decks }, { title }) {
  return {
    deck: title ? decks[title] : undefined,
  };
}

export default connect(mapStateToProps)(DeckInfo);
