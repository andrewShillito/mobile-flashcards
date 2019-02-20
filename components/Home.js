import React from 'react';
import { Text, View, FlatList } from 'react-native';
import Deck from "./Deck";
import { connect } from "react-redux";
import { handleReceiveDecks } from "../actions/decks";
import { setActiveDeck } from "../actions/activeDeck";
import { setLocalNotification, clearLocalNotifications } from "../utils/notifications";
import { Permissions } from "expo";
import styles from "../styles/home";

class Home extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleReceiveDecks());
    // this.askPermission(); // commented to prevent generating new notifications
    // clearLocalNotifications(); // for development
  }
  renderItem = ({ item }) => {
    return <Deck deck={item} goToDeckDetail={this.goToDeckDetail} goToQuiz={this.goToQuiz} goToEdit={this.goToEdit} />
  }
  goToDeckDetail = (title) => {
    this._setActiveDeck(title);
    this.props.navigation.navigate("DeckDetail")
  }
  goToQuiz = (title) => {
    this._setActiveDeck(title);
    this.props.navigation.push("DeckDetail");
    this.props.navigation.push("Quiz");
  }
  goToEdit = (title) => {
    this._setActiveDeck(title);
    this.props.navigation.push("DeckDetail");
    this.props.navigation.push("EditDeck");
  }
  _setActiveDeck = (title) => {
    this.props.dispatch(setActiveDeck(title));
  }
  askPermission = () => {
    Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then(({ status }) => {
        if (status === "granted") {
          setLocalNotification(); //sets new notification for 5pm tomorrow if no existing notification
        }
      });
  }
  render() {
    const { decks } = this.props; //array instead of obj because of mapStateToProps below
    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.title}
          ListEmptyComponent={() => <Text style={{alignSelf: "center", fontSize: 20}}>No decks! Create a new one to view here.</Text>}
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
