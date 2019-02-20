import React from 'react';
import { Text, View, TextInput } from 'react-native';
import SubmitBtn from "./SubmitBtn";
import { newStyles as styles } from "../styles";
import { connect } from "react-redux";
import { handleAddDeck } from "../actions/decks";
import ButtonPrimary from "./ButtonPrimary";

class New extends React.Component {
  static navigationOptions = (data) => {
  }
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
  onChange = ({ title }) => {
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
    return (
      <View style={styles.new}>
        <Text style={styles.header}>Create a new deck</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Deck Title"
            onChangeText={(title) => this.onChange({title})}
            value={this.state.title}
            maxLength={30}
            />
        </View>
        <View>
          <ButtonPrimary onPress={this.onPress}>Submit</ButtonPrimary>
          <View style={{alignItems: "center"}}>
            <Text style={{color: this.state.messageColor}}>{this.state.message}</Text>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps({ decks }) {
  return {
    deckNames: Object.keys(decks),
  }
}

export default connect(mapStateToProps)(New);
