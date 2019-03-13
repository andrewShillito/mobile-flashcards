import React from "react";
import { View, Text, TouchableOpacity, FlatList, Dimensions } from "react-native";
import SubmitBtn from "./SubmitBtn";
import { connect } from "react-redux";
import Card from "./Card";

class EditCards extends React.Component {
  renderItem = ({ item, index }) => {
    return (
      <Card question={item} index={index} toggleModal={this.props.toggleModal}/>
    );
  }

  render() {
    const { deck } = this.props;

    return (
      <View style={{marginTop: 20, flex: 3, justifyContent: "flex-end"}}>
        <FlatList
          data={deck ? deck.questions : []}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.card_id}
          ListEmptyComponent={() => <Text style={{alignSelf: "center", fontSize: 20}}>No cards in this deck!</Text>}
        />
      </View>
    );
  }
}

function mapStateToProps({ activeDeck, decks }, { toggleModal }) {
  return {
    deck: decks[activeDeck],
    toggleModal,
  };
}

export default connect(mapStateToProps)(EditCards);
