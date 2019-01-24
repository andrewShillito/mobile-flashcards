import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import Deck from "./Deck";
import SubmitBtn from "./SubmitBtn";
import DeckInfo from "./DeckInfo";

class DeckDetail extends React.Component {
  static navigationOptions = ({ screenProps }) => {
    return {
      title: screenProps.activeDeck,
    };
  }
  startQuiz = () => {
    this.props.navigation.navigate("Home"); // change to go to quiz
  }
  editDeck = () => {
    this.props.navigation.navigate("EditDeck");
  }
  addCard = () => {
    this.props.navigation.navigate("AddCard");
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: "center"}}>
        <DeckInfo title={this.props.deck ? this.props.deck.title : ""} />
        <SubmitBtn onPress={this.startQuiz}>Start Quiz</SubmitBtn>
        <SubmitBtn onPress={this.addCard}>Add Card</SubmitBtn>
        <SubmitBtn onPress={this.editDeck}>Edit Deck</SubmitBtn>
      </View>
    );
  }
}

function mapStateToProps({ decks, activeDeck }, { navigation }) {
  return {
    deck: decks[activeDeck],
  };
}

export default connect(mapStateToProps)(DeckDetail);
