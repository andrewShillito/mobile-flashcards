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
    const { decks } = this.props;
    return (
      <View>
        {Object.keys(decks).map((title) => (
          <Deck deck={decks[title]} key={title} />
        ))}
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
