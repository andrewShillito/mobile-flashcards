import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

function DeckInfo(props) {
  console.log(props);
  return (
    <View style={{alignItems: "center"}}>
      <Text style={{fontSize: 30}}>Number of Cards</Text>
      <Text style={{fontSize: 30}}>{props.deck.questions.length}</Text>
    </View>
  );
}

function mapStateToProps({ decks }, { title }) {
  return {
    deck: decks[title],
  };
}

export default connect(mapStateToProps)(DeckInfo);
