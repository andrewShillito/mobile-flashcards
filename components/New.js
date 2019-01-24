import React from 'react';
import { Text, View, TextInput } from 'react-native';
import SubmitBtn from "./SubmitBtn";
import { newStyles as styles } from "../styles";
import { connect } from "react-redux";
import { handleAddDeck } from "../actions/decks";

class New extends React.Component {
  static navigationOptions = (data) => {
  }
  state = {
    title: "", // add feedback message for submission (ie: warning or let them know it is ready)
  }
  onPress = () => {
    if (this.state.title === "") {
      alert("Title cannot be blank");
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
            />
        </View>
        <SubmitBtn onPress={this.onPress}>Submit</SubmitBtn>
      </View>
    );
  }
}

export default connect()(New);
