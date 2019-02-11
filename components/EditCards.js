import React from "react";
import { View, Text, TouchableOpacity, FlatList, Dimensions } from "react-native";
import SubmitBtn from "./SubmitBtn";
import { connect } from "react-redux";
import Card from "./Card";

class EditCards extends React.Component {
  renderItem = ({ item }) => {
    console.log("item", item)
    return (
      <Card question={item} />
    );
  }
  render() {
    const { deck } = this.props;
    console.log("Questions", deck.questions);
    const { height } = Dimensions.get("window");
    const resultingHeight = Math.round(height*.50)-40;
    console.log("height:", resultingHeight);
    
    return (
      <View style={{height: resultingHeight, marginTop: 40}}>
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
