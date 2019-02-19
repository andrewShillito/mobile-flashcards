import React from 'react';
import { Text, View, TouchableOpacity, Animated, StyleSheet, Dimensions, } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { setActiveCard } from "../actions/activeCard";

class Card extends React.Component {
  handleTouch = () => {
    const index = this.props.index;
    const newCard = {
      deck: this.props.deck.title,
      index: index,
      question: this.props.deck.questions[index].question,
      answer: this.props.deck.questions[index].answer,
    };
    this.props.toggleModal();
    this.props.dispatch(setActiveCard(newCard));
  }
  render() {
    const { question, index } = this.props;

    return (
      <View style={{flexDirection: "row", flex: 1}}>
        <TouchableOpacity onPress={this.handleTouch} style={styles.card}>
          <Text style={styles.text}>{`${index+1}. ${question.question}`}</Text>
          <View style={styles.line}></View>
          <Text style={styles.text}>{question.answer}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 150,
    width: Dimensions.get("window").width,
    marginTop: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: "#343a40",
    fontSize: 25,
    marginHorizontal: 5,
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    margin: 10,
    width: Math.round((Dimensions.get("window").width)*.60),
  },
});

function mapStateToProps({ decks, activeDeck }, { question, index }) {
  return {
    deck: decks[activeDeck],
    question,
    index,
  };
}

export default connect(mapStateToProps)(Card);
