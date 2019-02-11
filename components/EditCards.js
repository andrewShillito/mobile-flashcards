import React from "react";
import { View, Text, TouchableOpacity, FlatList, Dimensions } from "react-native";
import SubmitBtn from "./SubmitBtn";
import { connect } from "react-redux";
import Card from "./Card";

class EditCards extends React.Component {
  renderItem = ({ item }) => {
    return (
      <Card question={item} />
    );
  }
  render() {
    const { deck } = this.props;
    console.log(deck.questions);
    const { height } = Dimensions.get("window");

    return (
      <View style={{height: Math.round(height*.50)-40, marginTop: 40}}>
        <FlatList
          data={deck.questions}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.question}
          ListEmptyComponent={() => <Text>No questions in this deck!</Text>}
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
