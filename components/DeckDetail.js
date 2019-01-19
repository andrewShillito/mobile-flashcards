import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

class DeckDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
    };
  }
  render() {
    console.log(this.props);
    return (
      <View>
        <Text>Deck Detail</Text>
      </View>
    );
  }
}

function mapStateToProps({ decks }, { navigation }) {
  const title = navigation.state.params.title;
  return {
    deck: decks[title],
  };
}

export default connect(mapStateToProps)(DeckDetail);
