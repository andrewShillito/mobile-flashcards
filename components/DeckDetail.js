import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Deck from "./Deck";
import SubmitBtn from "./SubmitBtn";
import DeckInfo from "./DeckInfo";
import EditCards from "./EditCards";
import EditCardModal from "./EditCardModal";
import { setActiveCard, clearActiveCard } from "../actions/activeCard";

class DeckDetail extends React.Component {
  static navigationOptions = ({ screenProps }) => {
    return {
      title: screenProps.activeDeck,
    };
  }
  state = {
    isModalVisible: false,
  };
  startQuiz = () => {
    if (this.props.deck.questions.length === 0) {
      alert("Deck has no cards. Add a card first.");
      return;
    }
    this.props.navigation.navigate("Quiz");
  }
  editDeck = () => {
    this.props.navigation.navigate("EditDeck");
  }
  addCard = () => {
    this.props.navigation.navigate("AddCard");
  }
  toggleModal = (index) => {
    this.setState((prevState) => ({
      isModalVisible: !prevState.isModalVisible,
    }));
  }
  openModal = () => {
    this.setState(() => ({
      isModalVisible: true,
    }));
  }
  closeModal = () => {
    this.setState(() => ({
      isModalVisible: false,
    }));
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <DeckInfo title={this.props.deck ? this.props.deck.title : ""} />
        <SubmitBtn onPress={this.startQuiz} type="submitBtn">Start Quiz</SubmitBtn>
        <SubmitBtn onPress={this.editDeck} type="textButton">Edit Deck</SubmitBtn>
        <EditCards toggleModal={this.toggleModal} />
        <EditCardModal toggleModal={this.toggleModal} isModalVisible={this.state.isModalVisible} />
      </View>

    );
  }
}

function mapStateToProps({ decks, activeDeck, activeCard }, { navigation }) {
  return {
    deck: decks[activeDeck],
  };
}

export default connect(mapStateToProps)(DeckDetail);
