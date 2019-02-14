import React from "react";
import { View, Text, TouchableOpacity, FlatList, Dimensions } from "react-native";
import SubmitBtn from "./SubmitBtn";
import { connect } from "react-redux";
import Card from "./Card";

class EditCards extends React.Component {
  renderItem = ({ item, index }) => {
    return (
      <Card question={item} index={index}/>
    );
  }
  render() {
    const { deck } = this.props;
    const { height } = Dimensions.get("window");
    const resultingHeight = Math.round(height*.70)-30;

    return (
      <View style={{marginTop: 20, flex: 3, justifyContent: "flex-end"}}>
        <FlatList
          data={deck.questions}
          renderItem={this.renderItem}
          keyExtractor={(item) => `${item.question} ${item.answer}`}
          ListEmptyComponent={() => <Text style={{alignSelf: "center", fontSize: 20}}>No cards in this deck!</Text>}
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
