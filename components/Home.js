import React from 'react';
import { Text, View, FlatList } from 'react-native';
import Deck from "./Deck";
import { connect } from "react-redux";
import { handleReceiveDecks } from "../actions/decks";

class Home extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleReceiveDecks());
  }
  renderItem = ({ item }) => {
    return <Deck deck={item} />
  }
  render() {
    const { decks } = this.props; //array instead of obj because of mapStateToProps below
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.title}
          />
      </View>
    );
  }
}

function mapStateToProps({ decks }) {
  // mapping decks object to an array
  return {
    decks: Object.keys(decks).map(title => {
      return decks[title];
    })
  }
}

export default connect(mapStateToProps)(Home);
