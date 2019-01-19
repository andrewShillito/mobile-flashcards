import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import Deck from "./Deck";
import SubmitBtn from "./SubmitBtn";
import DeckInfo from "./DeckInfo";

class DeckDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: navigation.state.params.title,
    };
  }
  render() {
    const { title, questions } = this.props.deck;
    return (
      <View style={{flex: 1, justifyContent: "center"}}>
        <DeckInfo title={title} />
        <SubmitBtn>Start Quiz</SubmitBtn>
      </View>
    );
  }
}

function mapStateToProps({ decks }, { navigation }) {
  console.log("NAVIGATION:", navigation)
  const title = navigation.state.params.title;
  return {
    deck: decks[title],
  };
}

export default connect(mapStateToProps)(DeckDetail);
