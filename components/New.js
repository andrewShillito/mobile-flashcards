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
import { validateUniqueDeckName, validateInputLength } from "../utils/helpers";
import { RED, SUCCESS } from "../styles/shared";

class New extends React.Component {
  state = {
    title: "",
    message: "Submit to create a new deck",
    messageColor: SUCCESS,
    warningColor: RED,
    successColor: SUCCESS,
    duplicateTitleMessage: "Deck name already taken",
    successMessage: "Ready for Submission",
    emptyInputMessage: "Blank titles are not allowed",
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
