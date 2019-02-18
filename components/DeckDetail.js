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
    cardIndex: 0,
  }
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
  toggleModal = (index) => {
    if (!this.state.isModalVisible) {
      const newCard = {
        deck: this.props.deck.title,
        index: index,
        question: this.props.deck.questions[index].question,
        answer: this.props.deck.questions[index].answer,
      };
      this.props.dispatch(setActiveCard(newCard));
    }
    else {
      this.props.dispatch(clearActiveCard());
    }
    this.setState((prevState) => ({
      isModalVisible: !prevState.isModalVisible,
      cardIndex: index,
    }));
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <DeckInfo title={this.props.deck ? this.props.deck.title : ""} />
        <SubmitBtn onPress={this.startQuiz} type="submitBtn">Start Quiz</SubmitBtn>
        <SubmitBtn onPress={this.editDeck} type="textButton">Edit Deck</SubmitBtn>
        <EditCards toggleModal={this.toggleModal}/>
        <EditCardModal isModalVisible={this.state.isModalVisible} toggleModal={this.toggleModal} cardIndex={this.state.cardIndex}/>
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
