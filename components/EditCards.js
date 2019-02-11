import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import SubmitBtn from "./SubmitBtn";
import { connect } from "react-redux";
import Card from "./Card";

class EditCards extends React.Component {
  renderItem = (item) => {
    return (
      <Text>WTFFFF?</Text>
    );
  }
  render() {
    const { deck } = this.props;
    console.log(deck.questions);

    return (
      <View>
        <FlatList
          data={deck.questions}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.question}
        />
      </View>
    );
  }
}

function mapStateToProps({ activeDeck, decks }) {
  return {
    deck: decks[activeDeck],
  }
}

export default connect(mapStateToProps)(EditCards);
