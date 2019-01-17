import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

class DeckDetail extends React.Component {
  render() {
    return (
      <View>
        <Text>Deck Detail</Text>
      </View>
    );
  }
}

export default connect()(DeckDetail);
