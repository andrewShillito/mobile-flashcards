import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Deck from "./Deck";
import { connect } from "react-redux";
import { handleReceiveDecks } from "../actions/decks";

class Home extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleReceiveDecks());
  }
  render() {
    return (
      <View>
        <Deck name="Deck 1"/>
        <Text>{JSON.stringify(this.props)}</Text>
      </View>
    );
  }
}

function mapStateToProps({ decks }) {
  return {
    decks,
  }
}

export default connect(mapStateToProps)(Home);
