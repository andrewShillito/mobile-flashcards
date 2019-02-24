import React from 'react';
import { Text, View } from 'react-native';
import SubmitBtn from "./SubmitBtn";
import styles from "../styles/newDeck";
import { connect } from "react-redux";
import { handleAddDeck } from "../actions/decks";
import ButtonPrimary from "./ButtonPrimary";
import InputFeedbackText from "./InputFeedbackText";
import TextInputPrimary from "./TextInputPrimary";
import CloseKeyboardWrapper from "./CloseKeyboardWrapper";
import FormGroupPrimary from "./FormGroupPrimary";

class New extends React.Component {
  state = {
    title: "",
    message: "Submit to create a new deck",
    messageColor: "#28a745",
    warningColor: "#dc3545",
    successColor: "#28a745",
    duplicateTitleMessage: "Deck name already taken",
    successMessage: "Ready for Submission",
    emptyInputMessage: "Blank titles are not allowed",
    inputTooLongMessage: "Max title length exceeded",
    maxInputLength: 30,
  }
  onPress = () => {
    if (!this.validateInput()) {
      alert(this.message);
      return;
    }
    else {
      this.setState(() => ({
        title: '',
      }));
      this.props.dispatch(handleAddDeck(this.state.title));
      this.props.navigation.navigate("DeckDetail");
    }
  }
  onChange = (title) => {
    this.setState(() => ({
      title,
    }), this.validateInput);
  }
  validateInput = () => {
    const { deckNames } = this.props;
    if (this.state.title.length > 0) {
      if (deckNames.includes(this.state.title)) {
        this.setMessage(this.state.duplicateTitleMessage, this.state.warningColor);
        return false;
      } else if (this.state.title.length > this.state.maxInputLength) {
        this.setMessage(this.state.inputTooLongMessage, this.state.warningColor);
        return false;
      } else {
        this.setMessage(this.state.successMessage, this.state.successColor);
        return true;
      }
    }
    this.setMessage(this.state.emptyInputMessage, this.state.warningColor);
    return false;
  }
  setMessage = (message, messageColor) => {
    this.setState(() => ({
      message,
      messageColor,
    }));
  }
  render() {
    const inputProps = [
      {
        placeholder: "Deck Title",
        onChangeText: this.onChange,
        value: this.state.title,
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
    return (
      <CloseKeyboardWrapper containerStyle={styles.container}>
        <Text style={styles.header}>Create a new deck</Text>
        <FormGroupPrimary
          inputProps={inputProps}
          textProps={textProps}
          buttonProps={buttonProps}
          />
      </CloseKeyboardWrapper>
    );
  }
}

function mapStateToProps({ decks }) {
  return {
    deckNames: Object.keys(decks),
  }
}

export default connect(mapStateToProps)(New);
