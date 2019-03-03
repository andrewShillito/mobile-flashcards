import React from 'react';
import { Text, View, FlatList, Picker } from 'react-native';
import Deck from "./Deck";
import { connect } from "react-redux";
import { handleReceiveDecks} from "../actions/decks";
import { handleReceiveCategories } from "../actions/categories";
import { setActiveDeck, clearActiveDeck } from "../actions/activeDeck";
import { setLocalNotification, clearLocalNotifications } from "../utils/notifications";
import { Permissions } from "expo";
import SelectCategoryModal from "./SelectCategoryModal";
import ButtonSecondary from "./ButtonSecondary";
import styles from "../styles/home";

class Home extends React.Component {
  state = {
    selectedCategory: "all",
    isModalVisible: false,
  }
  componentDidMount() {
    this.props.dispatch(handleReceiveDecks());
    this.props.dispatch(handleReceiveCategories());
    // this.askPermission(); // commented to prevent generating new notifications
    clearLocalNotifications(); // for development
    if (this.props.activeDeck !== null) {
      this.props.dispatch(clearActiveDeck());
    }
  }
  renderItem = ({ item }) => {
    return <Deck deck={item} goToDeckDetail={this.goToDeckDetail} goToQuiz={this.goToQuiz} goToEdit={this.goToEdit} active={this.props.activeDeck === item.title} />
  }
  goToDeckDetail = (title) => {
    if (this.props.activeDeck !== title) {
      this._setActiveDeck(title);
    }
    this.props.navigation.navigate("DeckDetail")
  }
  goToQuiz = (title) => {
    if (this.props.activeDeck !== title) {
      this._setActiveDeck(title);
    }
    this.props.navigation.push("DeckDetail");
    this.props.navigation.push("Quiz");
  }
  goToEdit = (title) => {
    if (this.props.activeDeck !== title) {
      this._setActiveDeck(title);
    }
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
  updateSelectedCategory = (val, index) => {
    this.setState(() => ({
      selectedCategory: val,
    }));
  }
  toggleModal = () => {
    this.setState((prevState) => ({
      isModalVisible: !prevState.isModalVisible,
    }));
  }
  render() {
    const { decks, categories } = this.props; //array instead of obj because of mapStateToProps below
    console.log(categories);
    // const selectedDecks = (this.state.category !== "all") // add test for empty category list
    //   ? [...categories[this.state.category]].map((name) => decks[name])
    //   : Object.keys(decks).map((title) => decks[title]);
    const selectedDecks = Object.keys(decks).map(title => decks[title]);

    return (
      <View style={styles.container}>
        <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}}>
          <Text>{`Showing ${this.state.selectedCategory}`}</Text>
          <ButtonSecondary onPress={this.toggleModal}>Select Category</ButtonSecondary>
        </View>
        <SelectCategoryModal
          onPress={() => {

          }}
          onValueChange={this.updateSelectedCategory}
          categories={this.props.categories}
          selectedCategory={this.state.category}
          visible={this.state.isModalVisible}
          onRequestClose={this.state.toggleModal}
          onPressOutside={this.state.toggleModal}
          />
        <FlatList
          data={selectedDecks}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.title}
          ListEmptyComponent={() => <Text style={{alignSelf: "center", fontSize: 20}}>No decks! Create a new one to view here.</Text>}
          />
      </View>
    );
  }
}

function mapStateToProps({ decks, activeDeck, categories }) {
  return {
    decks,
    activeDeck,
    categories,
  }
}

export default connect(mapStateToProps)(Home);
