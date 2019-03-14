import React from 'react';
import { Text, View, Picker } from 'react-native';
import styles from "../styles/newDeck";
import { connect } from "react-redux";
import { handleAddDeck } from "../actions/decks";
import CloseKeyboardWrapper from "./CloseKeyboardWrapper";
import FormGroupPrimary from "./FormGroupPrimary";
import { validateUniqueDeckName, validateInputLength } from "../utils/helpers";
import { RED, SUCCESS } from "../styles/shared";
import { clearActiveDeck } from "../actions/activeDeck";
import ModalWrapperSecondary from "./ModalWrapperSecondary";
import ButtonSecondary from "./ButtonSecondary";

class New extends React.Component {
  state = {
    title: "",
    category: "Uncategorized",
    isModalVisible: false,
    message: "Submit to create a new deck",
    messageColor: SUCCESS,
    warningColor: RED,
    successColor: SUCCESS,
    duplicateTitleMessage: "Deck name already taken",
    successMessage: "Ready for Submission",
    emptyInputMessage: "Blank titles are not allowed",
  }
  componentDidMount() {
    if (this.props.activeDeck !== null) {
      this.props.dispatch(clearActiveDeck());
    }
  }
  onPress = () => {
    if (!this.validateInput()) {
      alert(this.message);
      return;
    }
    else {
      let category;
      if (this.state.category === "Uncategorized" || this.state.category === "") {
        category = "Uncategorized";
      } else {
        category = this.state.category;
      }
      this.props.dispatch(handleAddDeck(category, this.state.title));
      this.props.navigation.navigate("DeckDetail");
      this.setState(() => ({
        title: '',
        category: "",
      }));
    }
  }
  onChange = (title) => {
    this.setState(() => ({
      title,
    }), this.validateInput);
  }
  onChangeCategory = (category) => {
    this.setState(() => ({
      category,
    }));
  }
  toggleModal = () => {
    this.setState(prevState => ({
      isModalVisible: !prevState.isModalVisible,
    }));
  }
  openModal = () => {
    this.setState(() => ({
      isModalVisible: true,
      category: "Uncategorized",
    }));
  }
  closeModal = () => {
    this.setState(() => ({
      isModalVisible: false,
    }));
  }
  validateInput = () => {
    const { deckNames } = this.props;
    if (validateInputLength(this.state.title)) {
      if (validateUniqueDeckName(this.state.title, deckNames)){
        this.setDuplicateTitleMessage();
        return false;
      } else {
        this.setSuccessMessage();
        return true;
      }
    }
    this.setEmpyInputMessage();
    return false;
  }
  setMessage = (message, messageColor) => {
    this.setState(() => ({
      message,
      messageColor,
    }));
  }
  setDuplicateTitleMessage = () => {
    this.setMessage(this.state.duplicateTitleMessage, this.state.warningColor);
  }
  setEmpyInputMessage = () => {
    this.setMessage(this.state.emptyInputMessage, this.state.warningColor);
  }
  setSuccessMessage = () => {
    this.setMessage(this.state.successMessage, this.state.successColor);
  }
  render() {
    const inputProps = [
      {
        placeholder: "Deck Title",
        onChangeText: this.onChange,
        value: this.state.title,
      },
      {
        placeholder: "Create Category",
        onChangeText: this.onChangeCategory,
        value: this.state.category,
      },
    ];
    const buttonProps = {
      text: "Submit",
      onPress: this.onPress,
    };
    const textProps = {
      color: this.state.messageColor,
      message: this.state.message,
    };
    const { categories } = this.props;
    const category = categories.includes(this.state.category) ? category : "Uncategorized";
    // const uncategorizedItem = categories.includes("Uncategorized")
    //   ? <Picker.Item label="Uncategorized" value="Uncategorized" key="Uncategorized" />
    //   : null
    return (
      <CloseKeyboardWrapper containerStyle={styles.container}>
        <Text style={styles.header}>Create a new deck</Text>
        <FormGroupPrimary
          inputProps={inputProps}
          textProps={textProps}
          buttonProps={buttonProps}
          />
        <ButtonSecondary onPress={this.openModal}>or pick an existing category</ButtonSecondary>
        <ModalWrapperSecondary
          visible={this.state.isModalVisible}
          onRequestClose={this.closeModal}
          onPressOutside={this.closeModal}
          transparent={true}
          >
          <Picker
              selectedValue={category}
              onValueChange={this.state.onChangeCategory}
              itemStyle={styles.pickerText}
              style={styles.picker}
              >
              {categories.length
                ? categories.map((name) => (
                  <Picker.Item label={name} value={name} key={name} />
                ))
                : <Picker.Item label="Uncategorized" value="Uncategorized" key="Uncategorized" />
              }
          </Picker>
        </ModalWrapperSecondary>

      </CloseKeyboardWrapper>
    );
  }
}

function mapStateToProps({ decks, activeDeck, categories }) {
  return {
    deckNames: Object.keys(decks),
    activeDeck,
    categories: Object.keys(categories),
  }
}

export default connect(mapStateToProps)(New);
