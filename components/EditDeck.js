import React from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";
import { connect } from "react-redux";
import SubmitBtn from "./SubmitBtn";
import { handleEditTitle, handleRemoveDeck } from "../actions/decks";
import AddCard from "./AddCard";
import styles from "../styles/editDeck";
import { inputStyles } from "../styles";
import TextInputPrimary from "./TextInputPrimary";
import InputFeedbackText from "./InputFeedbackText";
import ButtonPrimary from "./ButtonPrimary";
import ButtonWarning from "./ButtonWarning";

class EditDeck extends React.Component {
  static navigationOptions = ({ screenProps }) => {
    return {
      title: `Edit ${screenProps.activeDeck}`,
    };
  }
  state = {
    title: '',
    message: "Submit to change deck name",
    messageColor: "#28a745",
    warningColor: "#dc3545",
    successColor: "#28a745",
    duplicateTitleMessage: "Deck name already taken",
    sameAsCurrentTitleMessage: "Same as current title",
    successMessage: "Ready for Submission",
    emptyInputMessage: "Blank titles not allowed",
    inputTooLongMessage: "Max title length exceeded",
  }
  onChange = ({ title }) => {
    this.setState(() => ({
      title,
    }), this.validateInput);
  }
  editTitle = (oldTitle, newTitle) => {
    if (this.validateInput()) {
      this.props.dispatch(handleEditTitle(oldTitle, newTitle));
      this.setState(() => ({
        title: "",
      }));
      this.props.navigation.navigate("DeckDetail");
    }
    else {
      alert(this.state.message);
      return;
    }
  }
  deleteDeck = () => {
    this.props.dispatch(handleRemoveDeck(this.props.activeDeck));
    this.clearInput();
    this.props.navigation.navigate("Home");
  }
  clearInput = () => {
    this.setState(() => ({
      title: "",
    }))
  }
  validateInput = () => {
    if (this.state.title.length) {
      if (this.props.deckNames.includes(this.state.title)) {
        if (this.state.title === this.props.activeDeck) {
          this.setMessage(this.state.sameAsCurrentTitleMessage, this.state.warningColor);
          return false;
        }
        this.setMessage(this.state.duplicateTitleMessage, this.state.warningColor);
        return false;
      } else if (this.state.title.length > 40) {
        this.setMessage(this.state.inputTooLongMessage, this.state.warningColor);
        return false;
      } else {
        this.setMessage(this.state.successMessage, this.state.successColor);
        return true;
      }
    } else {
      this.setMessage(this.state.emptyInputMessage, this.state.warningColor);
      return false;
    }
  }
  setMessage = (message, messageColor) => {
    this.setState(() => ({
      message: message,
      messageColor: messageColor,
    }));
  }
  render() {
    const { activeDeck } = this.props;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInputPrimary
            onChangeText={(title) => this.onChange({ title })}
            placeholder="New Title"
            value={this.state.title}
            maxLength={120}
            />
          <View>
            <ButtonPrimary onPress={() => this.editTitle(this.props.activeDeck, this.state.title)}>Submit</ButtonPrimary>
            <InputFeedbackText color={this.state.messageColor}>{this.state.message}</InputFeedbackText>
          </View>
          <AddCard />
          <ButtonWarning onPress={this.deleteDeck}>Delete Deck</ButtonWarning>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

function mapStateToProps({ activeDeck, decks }) {
  return {
    activeDeck,
    deckNames: Object.keys(decks),
  }
}

export default connect(mapStateToProps)(EditDeck);
