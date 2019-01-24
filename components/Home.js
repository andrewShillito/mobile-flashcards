import React from 'react';
import { Text, View, FlatList } from 'react-native';
import Deck from "./Deck";
import { connect } from "react-redux";
import { handleReceiveDecks } from "../actions/decks";
import { setActiveDeck } from "../actions/activeDeck";
import { setLocalNotification, clearLocalNotifications } from "../utils/notifications";
import { Permissions } from "expo";

class Home extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleReceiveDecks());
    this.askPermission();
    // clearLocalNotifications();
  }
  renderItem = ({ item }) => {
    return <Deck deck={item} onPress={this.onPress} />
  }
  onPress = (title) => {
    this.props.dispatch(setActiveDeck(title));
    this.props.navigation.navigate("DeckDetail");
  }
  askPermission = () => {
    Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then(({ status }) => {
        if (status === "granted") {
          console.log("success");
          setLocalNotification();
        }
      });
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
