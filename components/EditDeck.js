import React from "react";
import { connect } from "react-redux";
import { handleEditTitle, handleRemoveDeck } from "../actions/decks";
import styles from "../styles/editDeck";
import AddCard from "./AddCard";
import ButtonWarning from "./ButtonWarning";
import CloseKeyboardWrapper from "./CloseKeyboardWrapper";
import FormGroupPrimary from "./FormGroupPrimary";
import { validateInputLength, validateUniqueDeckName } from "../utils/helpers";
import { RED, SUCCESS } from "../styles/shared";

class EditDeck extends React.Component {
  static navigationOptions = ({ screenProps }) => {
    return {
      title: `Edit ${screenProps.activeDeck}`,
    };
  }
  state = {
    title: '',
    message: "Submit to change deck name",
    messageColor: SUCCESS,
    warningColor: RED,
    successColor: SUCCESS,
    duplicateTitleMessage: "Deck name already taken",
    sameAsCurrentTitleMessage: "Same as current title",
    successMessage: "Ready for Submission",
    emptyInputMessage: "Blank titles not allowed",
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
    if (validateInputLength(this.state.title)) {
      if (validateUniqueDeckName(this.state.title, this.props.deckNames)) {
        if (this.state.title === this.props.activeDeck) {
          this.setSameAsCurrentMessage();
          return false;
        } else {
          this.setDuplicateTitleMessage();
          return false;
        }
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
      message: message,
      messageColor: messageColor,
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
  setSameAsCurrentMessage = () => {
    this.setMessage(this.state.sameAsCurrentTitleMessage, this.state.warningColor);
  }
  render() {
    const { activeDeck } = this.props;
    const inputProps = [
      {
        placeholder: "New Title",
        value: this.state.title,
        onChangeText: (title) => this.onChange({ title }),
      },
    ];
    const buttonProps = {
      onPress: () => this.editTitle(this.props.activeDeck, this.state.title),
      text: "Submit",
    };
    const textProps = {
      color: this.state.messageColor,
      message: this.state.message,
    };

    return (
      <CloseKeyboardWrapper containerStyle={styles.container}>
        <FormGroupPrimary
          inputProps={inputProps}
          buttonProps={buttonProps}
          textProps={textProps}
          />
        <AddCard />
        <ButtonWarning onPress={this.deleteDeck}>Delete Deck</ButtonWarning>
      </CloseKeyboardWrapper>
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
