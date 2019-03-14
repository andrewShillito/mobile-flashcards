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
import HomeCategorySelector from "./HomeCategorySelector";
import styles from "../styles/home";

class Home extends React.Component {
  state = {
    selectedCategory: "Show All",
    isModalVisible: false,
  }
  componentDidMount() {
    this.props.dispatch(handleReceiveDecks());

    // this.askPermission(); // commented to prevent generating new notifications
    clearLocalNotifications(); // for development
    if (this.props.activeDeck !== null) {
      this.props.dispatch(clearActiveDeck());
    }
  }
  renderItem = ({ item }) => {
    return <Deck deck={item} goToDeckDetail={this.goToDeckDetail} goToQuiz={this.goToQuiz} goToEdit={this.goToEdit} active={item !== undefined ? this.props.activeDeck === item.title : false} />
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
    const { decks } = this.props; //array instead of obj because of mapStateToProps below

    const selectedDecks = this.state.selectedCategory === "Show All"
      ? decks
      : decks.filter(deck => {
        let category = deck.category === null ? "Uncategorized" : deck.category;
        if (category === this.state.selectedCategory) {
          return true;
        } else {
          return false;
        }
      });

    console.log("selected decks:", selectedDecks);
    return (
      <View style={styles.container}>
        <HomeCategorySelector
          category={this.state.selectedCategory}
          onPress={this.toggleModal}
          />
        <SelectCategoryModal
          onValueChange={this.updateSelectedCategory}
          selectedCategory={this.state.category}
          visible={this.state.isModalVisible}
          onRequestClose={this.toggleModal}
          onPressOutside={this.toggleModal}
          />
        <FlatList
          data={selectedDecks}
          renderItem={this.renderItem}
          keyExtractor={(item) => item !== undefined ? item.title : null}
          ListEmptyComponent={() => <Text style={{alignSelf: "center", fontSize: 20}}>No decks! Create a new one to view here.</Text>}
          />
      </View>
    );
  }
}

function mapStateToProps({ decks, activeDeck }) {
  return {
    decks: Object.keys(decks).map(title => {
      return decks[title];
    }),
    activeDeck
  }
}

export default connect(mapStateToProps)(Home);
