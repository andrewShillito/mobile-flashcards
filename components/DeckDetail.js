import React from "react";
import { View, Text, Picker } from "react-native";
import { connect } from "react-redux";
import Deck from "./Deck";
import DeckInfo from "./DeckInfo";
import EditCards from "./EditCards";
import EditCardModal from "./EditCardModal";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import ModalWrapperSecondary from "./ModalWrapperSecondary";
import { handleAddDeckToCategory } from "../actions/categories";
import styles from "../styles/deckDetail";

class DeckDetail extends React.Component {
  static navigationOptions = ({ screenProps }) => {
    return {
      title: screenProps.activeDeck,
    };
  }
  state = {
    isModalVisible: false,
    isPickerVisible: false,
    selectedCategory: "Uncategorized",
  };
  startQuiz = () => {
    if (this.props.deck.questions.length === 0) {
      alert("Deck has no cards. Add a card first.");
      return;
    }
    this.props.navigation.navigate("Quiz");
  }
  editDeck = () => {
    this.props.navigation.navigate("EditDeck");
  }
  addCard = () => {
    this.props.navigation.navigate("AddCard");
  }
  toggleModal = (index) => {
    this.setState((prevState) => ({
      isModalVisible: !prevState.isModalVisible,
    }));
  }
  openModal = () => {
    this.setState(() => ({
      isModalVisible: true,
    }));
  }
  closeModal = () => {
    this.setState(() => ({
      isModalVisible: false,
    }));
  }
  openPicker = () => {
    this.setState(() => ({
      isPickerVisible: true,
    }));
  }
  closePicker = () => {
    this.setState(() => ({
      isPickerVisible: false,
    }));
  }
  onValueChange = (val, index) => {
    this.setState(() => ({
      selectedCategory: val,
    }));
    this.props.dispatch(handleAddDeckToCategory(val, this.props.deck.title));
  }
  render() {
    const { deck, categories } = this.props;

    return (
      <View style={{flex: 1, alignItems: "center"}}>
        <ButtonSecondary onPress={this.openPicker}>{deck ? deck.category : "Edit Category"}</ButtonSecondary>
        <ButtonPrimary onPress={this.startQuiz}>Start Quiz</ButtonPrimary>
        <ButtonSecondary onPress={this.editDeck}>Edit Deck</ButtonSecondary>
        <EditCards toggleModal={this.toggleModal} />
        <EditCardModal toggleModal={this.toggleModal} isModalVisible={this.state.isModalVisible} closeModal={this.closeModal}/>
        <ModalWrapperSecondary
          visible={this.state.isPickerVisible}
          onRequestClose={this.closePicker}
          onPressOutside={this.closePicker}
          transparent={true}
        >
          <Picker
            selectedValue={this.state.selectedCategory}
            onValueChange={this.onValueChange}
            style={styles.picker}
            itemStyle={styles.pickerText}
            >
            {categories.length
              ? categories.map((name) => (
                <Picker.Item label={name} value={name} key={name} />
              ))
              : null
            }
          </Picker>
        </ModalWrapperSecondary>
      </View>
    );
  }
}

function mapStateToProps({ decks, activeDeck, categories }, { navigation }) {
  return {
    deck: decks[activeDeck],
    categories: Object.keys(categories),
  };
}

export default connect(mapStateToProps)(DeckDetail);
