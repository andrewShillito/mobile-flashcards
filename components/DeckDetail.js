import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import Deck from "./Deck";
import SubmitBtn from "./SubmitBtn";
import DeckInfo from "./DeckInfo";

class DeckDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    console.log("Detail Navigation:", navigation);
    return {
      title: navigation.state.params.title,
    };
  }
  startQuiz = () => {
    this.props.navigation.navigate("Home"); // change to go to quiz
  }
  editDeck = () => {
    this.props.navigation.navigate("EditDeck", { title: this.props.deck.title });
  }
  addCard = () => {
    this.props.navigation.navigate("AddCard", { title: this.props.deck.title });
  }
  render() {
    console.log("Detail Props:", this.props);
    const { title, questions } = this.props.deck;
    return (
      <View style={{flex: 1, justifyContent: "center"}}>
        <DeckInfo title={title} />
        <SubmitBtn onPress={this.startQuiz}>Start Quiz</SubmitBtn>
        <SubmitBtn onPress={this.addCard}>Add Card</SubmitBtn>
        <SubmitBtn onPress={this.editDeck}>Edit Deck</SubmitBtn>
      </View>
    );
  }
}

function mapStateToProps({ decks }, { navigation }) {
  console.log("Detail Map State:", decks, navigation);
  const title = navigation.state.params.title;
  return {
    deck: decks[title],
  };
}

export default connect(mapStateToProps)(DeckDetail);
